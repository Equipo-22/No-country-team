package com.example.telehealth_service.Models.Dtos;

import com.example.telehealth_service.Models.Enums.SessionStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TelehealthResponse(
        UUID appointmentId,
        UUID patientId,
        UUID professionalId,
        String meetingUrl,
        LocalDateTime startTime,
        LocalDateTime endTime,
        SessionStatus status,
        LocalDateTime createdAt
) {
}
