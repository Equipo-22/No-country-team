package com.example.telehealth_service.Models.Dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record TelehealthRequest(
        UUID appointmentId,
        UUID patientId,
        UUID professionalId,
        LocalDateTime startTime,
        LocalDateTime endTime
) {

}
