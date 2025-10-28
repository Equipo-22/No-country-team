package com.example.EHR_service.Models.Dtos.appointment;

import java.time.LocalDateTime;
import java.util.UUID;

public record AppointmentResponse(
        UUID id,
        UUID patientId,
        UUID professionalId,
        String meetingUrl,
        LocalDateTime startTime,
        LocalDateTime endTime,
        AppointmentType type,
        String motivo,
        String lugar,
        AppointmentStatus status,
        LocalDateTime createdAt
) {
}
