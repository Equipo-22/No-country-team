package com.example.notification_service.Mappers;

import com.example.notification_service.Models.Dtos.NotificationResponse;
import com.example.notification_service.Models.Entities.Notification;

public class NotificationMapper {
    public static NotificationResponse toNotificationResponse(Notification notification) {
        return new NotificationResponse(
                notification.getId(),
                notification.getUserId(),
                notification.getTitle(),
                notification.getDescription(),
                notification.getType(),
                notification.getDate(),
                notification.getAppointmentId(),
                notification.getRead()
        );
    }
}
