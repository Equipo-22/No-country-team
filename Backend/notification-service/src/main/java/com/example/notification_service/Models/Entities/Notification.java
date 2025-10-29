package com.example.notification_service.Models.Entities;

import com.example.notification_service.Models.Enums.NotificationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID userId;//paciente o medico

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private LocalDateTime date=LocalDateTime.now();

    private UUID appointmentId;

    private Boolean read = false;

}
