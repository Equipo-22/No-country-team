package com.example.notification_service.Models.Dtos;

import com.example.notification_service.Models.Enums.AppointmentStatus;
import com.example.notification_service.Models.Enums.AppointmentType;
import com.example.notification_service.Models.Enums.CancelledBy;

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
        CancelledBy cancelledBy,
        String motivo,
        String lugar,
        AppointmentStatus status,
        LocalDateTime createdAt
) {
}
