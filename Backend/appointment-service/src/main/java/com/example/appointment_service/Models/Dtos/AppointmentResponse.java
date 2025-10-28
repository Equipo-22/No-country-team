package com.example.appointment_service.Models.Dtos;

import com.example.appointment_service.Models.Enums.AppointmentStatus;
import com.example.appointment_service.Models.Enums.AppointmentType;

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
