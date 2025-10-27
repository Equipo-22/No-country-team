package com.example.auth_service.Kafka;

import com.example.auth_service.Models.Dtos.DoctorResponseDTO;
import com.example.auth_service.Models.Entities.ERole;
import com.example.auth_service.Services.RegistrationService;
import com.example.auth_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DoctorConsumer {

    private final RegistrationService registrationService;

    @KafkaListener(topics = "doctor_register-topic",groupId = "auth-group")
    public void handleDoctorSaved(String message) {
        DoctorResponseDTO doctorResponseDTO = Jsonutils.fromJson(message, DoctorResponseDTO.class);
        registrationService.addRoleToUser(doctorResponseDTO.userId(),ERole.ROLE_PERSONAL_MEDICO);
    }
}
