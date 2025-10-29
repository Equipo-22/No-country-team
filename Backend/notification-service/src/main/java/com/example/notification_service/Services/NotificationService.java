package com.example.notification_service.Services;

import com.example.notification_service.Mappers.NotificationMapper;
import com.example.notification_service.Models.Dtos.NotificationResponse;
import com.example.notification_service.Models.Entities.Notification;
import com.example.notification_service.Models.Enums.NotificationType;
import com.example.notification_service.Repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<NotificationResponse> getAllNotificationsByUserId(UUID userId,int page,int size,String sortBy, String direction) {
        Pageable pageable;
        if (sortBy != null && !sortBy.isEmpty()) {
            Sort sort = (direction != null && direction.equalsIgnoreCase("desc"))
                    ? Sort.by(sortBy).descending()
                    : Sort.by(sortBy).ascending();
            pageable = PageRequest.of(page, size, sort);
        } else {
            pageable = PageRequest.of(page, size);
        }
        Page<Notification> notifications=notificationRepository.getAllNotificationsByUserId(userId,pageable)
                        .orElseThrow(()-> new RuntimeException("No se encontro el user ID"));

        return notifications.stream().map(NotificationMapper::toNotificationResponse)
                .toList();
    }

    public void deleteNotification(UUID id){
        notificationRepository.deleteById(id);
    }

    public void marcarNotificacionComoLeida(UUID id){
        Notification notification=notificationRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("No se encontro la notification"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    public void crearNotificacion(UUID userId, String title, String description, NotificationType type, UUID appointmentId) {
        Notification n = new Notification();
        n.setUserId(userId);
        n.setTitle(title);
        n.setDescription(description);
        n.setType(type);
        n.setAppointmentId(appointmentId);
        notificationRepository.save(n);
    }
}
