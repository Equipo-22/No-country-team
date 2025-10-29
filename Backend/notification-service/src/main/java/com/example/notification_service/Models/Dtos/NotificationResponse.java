package com.example.notification_service.Models.Dtos;

import com.example.notification_service.Models.Enums.NotificationType;

import java.time.LocalDateTime;
import java.util.UUID;

public record NotificationResponse(
        UUID id,
        UUID userId,//paciente o medico
        String title,
        String description,
        NotificationType type,
        LocalDateTime date,
        UUID appointmentId,
        Boolean read
) {
}
