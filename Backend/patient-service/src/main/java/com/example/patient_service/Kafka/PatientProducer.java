package com.example.patient_service.Kafka;

import com.example.patient_service.Models.Dtos.PatientResponse;
import com.example.patient_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientProducer {
    private final KafkaTemplate<String,String> kafkaTemplate;

    public void sendPatientRegisterEvent(PatientResponse patientResponse){
        String eventJson= Jsonutils.toJson(patientResponse);
        kafkaTemplate.send("patient_register-topic",eventJson);
        System.out.println("Evento enviado a Kafka: " + eventJson);
    }
}
