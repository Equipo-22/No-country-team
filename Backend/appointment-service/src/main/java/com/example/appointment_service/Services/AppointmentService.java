package com.example.appointment_service.Services;

import com.example.appointment_service.Kafka.AppointmentProducer;
import com.example.appointment_service.Mappers.AppointmentMapper;
import com.example.appointment_service.Models.Dtos.AppointmentRequest;
import com.example.appointment_service.Models.Dtos.AppointmentResponse;
import com.example.appointment_service.Models.Entities.Appointment;
import com.example.appointment_service.Models.Enums.AppointmentStatus;
import com.example.appointment_service.Models.Enums.AppointmentType;
import com.example.appointment_service.Repositories.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final GoogleService googleService;
    private final AppointmentProducer appointmentProducer;

    public AppointmentResponse findById(UUID id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(()->new RuntimeException("No se encontro el appointment id"));
        return AppointmentMapper.toResponse(appointment);
    }

    public AppointmentResponse createAppointment(AppointmentRequest appointmentRequest) throws IOException {
        Appointment appointment = new Appointment();

        appointment.setPatientId(appointmentRequest.patientId());
        appointment.setProfessionalId(appointmentRequest.professionalId());
        appointment.setType(appointmentRequest.type());
        appointment.setStartTime(appointmentRequest.startTime());
        appointment.setEndTime(appointmentRequest.endTime());

        if(appointmentRequest.type().equals(AppointmentType.VIRTUAL)){
            googleService.createMeetLink(appointment);
        }else{
            googleService.createEventCalendar(appointment);
        }

        Appointment saved=appointmentRepository.save(appointment);


        AppointmentResponse dto=AppointmentMapper.toResponse(saved);

        appointmentProducer.sendAppointmentRegisterEvent(dto);

        return dto;
    }

    public void cancelAppointment(UUID appointment_id) throws IOException {
        Appointment appointment=appointmentRepository.findById(appointment_id)
                .orElseThrow(()->new RuntimeException("No se encontro el appointment id"));

        googleService.cancelMeet(appointment.getEventId());

        appointment.setMeetingUrl(null);
        appointment.setEventId(null);
        appointment.setStatus(AppointmentStatus.CANCELLED);

        appointmentRepository.save(appointment);
    }

    //cambia el estado a completed si paso la hora final
    @Scheduled(fixedRate = 60000) // cada 1 minuto
    public void updateCompletedAppointments() {
        LocalDateTime now = LocalDateTime.now();
        List<Appointment> finishedAppointments =
                appointmentRepository.findAllByStatusAndEndTimeBefore(AppointmentStatus.PENDING, now);

        for (Appointment appointment : finishedAppointments) {
            appointment.setStatus(AppointmentStatus.COMPLETED);
        }

        appointmentRepository.saveAll(finishedAppointments);
    }

}
