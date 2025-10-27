package com.example.appointment_service.Kafka;

import com.example.appointment_service.Models.Dtos.AppointmentResponse;
import com.example.appointment_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentProducer {
    private final KafkaTemplate<String,String> kafkaTemplate;

    public void sendAppointmentRegisterEvent(AppointmentResponse appointmentResponse){
        String eventJson= Jsonutils.toJson(appointmentResponse);
        kafkaTemplate.send("appointment-register-topic",eventJson);
        System.out.println("Evento enviado a Kafka: " + eventJson);
    }

}
