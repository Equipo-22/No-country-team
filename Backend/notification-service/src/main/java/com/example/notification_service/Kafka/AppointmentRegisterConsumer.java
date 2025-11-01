package com.example.notification_service.Kafka;

import com.example.notification_service.Clients.DoctorClient;
import com.example.notification_service.Clients.PatientClient;
import com.example.notification_service.Models.Dtos.AppointmentResponse;
import com.example.notification_service.Models.Dtos.DoctorResponseDTO;
import com.example.notification_service.Models.Dtos.PatientResponse;
import com.example.notification_service.Models.Entities.Notification;
import com.example.notification_service.Models.Enums.NotificationType;
import com.example.notification_service.Repositories.NotificationRepository;
import com.example.notification_service.Services.NotificationService;
import com.example.notification_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentRegisterConsumer {

    private final PatientClient patientClient;
    private final DoctorClient doctorClient;
    private final NotificationService notificationService;

    @KafkaListener(topics = "appointment-register-topic", groupId = "notification-group")
    public void handleAppointmentRegister(String message) {
        AppointmentResponse appointment = Jsonutils.fromJson(message, AppointmentResponse.class);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        String fecha = appointment.startTime().toLocalDate().format(dateFormatter);
        String hora = appointment.startTime().toLocalTime().format(timeFormatter);
        String tipoCita = appointment.type().name();

        DoctorResponseDTO doctor = doctorClient.findById(appointment.professionalId());
        PatientResponse patient = patientClient.getPatient(appointment.patientId());

        String descPaciente = String.format(
                "Consulta confirmada con el doctor %s el %s a las %s. Tipo de cita: %s.",
                doctor.name(), fecha, hora, tipoCita
        );
        notificationService.crearNotificacion(
                appointment.patientId(),
                "Tu cita ha sido registrada",
                descPaciente,
                NotificationType.OTRO,
                appointment.id()
        );

        String descDoctor = String.format(
                "Consulta confirmada con el paciente %s el %s a las %s. Tipo de cita: %s.",
                patient.nombre(), fecha, hora, tipoCita
        );
        notificationService.crearNotificacion(
                appointment.professionalId(),
                "Nueva cita asignada",
                descDoctor,
                NotificationType.OTRO,
                appointment.id()
        );
    }

}
