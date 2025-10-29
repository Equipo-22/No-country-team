package com.example.appointment_service.Kafka;

import com.example.appointment_service.Models.Dtos.AppointmentResponse;
import com.example.appointment_service.Models.Entities.Appointment;
import com.example.appointment_service.Models.Enums.AppointmentStatus;
import com.example.appointment_service.Repositories.AppointmentRepository;
import com.example.appointment_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentProducer {
    private final KafkaTemplate<String,String> kafkaTemplate;
    private final AppointmentRepository appointmentRepository;

    public void sendAppointmentRegisterEvent(AppointmentResponse appointmentResponse){
        String eventJson= Jsonutils.toJson(appointmentResponse);
        kafkaTemplate.send("appointment-register-topic",eventJson);
        System.out.println("Evento enviado a Kafka: " + eventJson);
    }

    public void sendAppointmentCancelledEvent(AppointmentResponse appointmentResponse){
        String eventJson= Jsonutils.toJson(appointmentResponse);
        kafkaTemplate.send("appointment-cancelled-topic",eventJson);
        System.out.println("Evento enviado a Kafka: " + eventJson);
    }

    @Scheduled(fixedRate = 60000) // cada 1 minuto
    public void sendAppointmentReminderEvent(){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneHourLater = now.plusHours(1);

        List<Appointment> upcoming = appointmentRepository
                .findByStartTimeBetweenAndStatusNot(now, oneHourLater, AppointmentStatus.CANCELLED);

        for (Appointment appointment : upcoming) {
            kafkaTemplate.send("appointment-reminder-topic", Jsonutils.toJson(appointment));
        }
    }

}
