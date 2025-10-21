package com.example.doctors.kafka;

import com.example.doctors.features.doctor.dto.DoctorResponseDTO;
import com.example.doctors.shared.util.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorProducer {
    private final KafkaTemplate<String,String> kafkaTemplate;

    public void sendDoctorRegisterEvent(DoctorResponseDTO doctorResponseDTO) {
        String eventJson = Jsonutils.toJson(doctorResponseDTO);
        kafkaTemplate.send("doctor_register-topic", eventJson);
        System.out.println("Evento enviado a Kafka: " + eventJson);
    }
}
