package com.example.notification_service.Repositories;

import com.example.notification_service.Models.Entities.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    Optional<Page<Notification>> getAllNotificationsByUserId(UUID userId, Pageable pageable);
}
