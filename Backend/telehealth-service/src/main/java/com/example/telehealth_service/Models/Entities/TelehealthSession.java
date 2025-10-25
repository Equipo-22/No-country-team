package com.example.telehealth_service.Models.Entities;

import com.example.telehealth_service.Models.Enums.SessionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TelehealthSession {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID appointmentId;

    @Column(nullable = false)
    private UUID patientId;

    @Column(nullable = false)
    private UUID professionalId;

    // Enlace generado (por Zoom, Jitsi, Meet, etc.)
    @Column(nullable = false, length = 500)
    private String meetingUrl;

    // Fecha y hora de inicio de la sesión
    private LocalDateTime startTime;

    // Fecha y hora de finalización
    private LocalDateTime endTime;

    // Estado de la sesión (PENDING, ACTIVE, COMPLETED, CANCELLED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus status = SessionStatus.PENDING;

    // Fecha de creación
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();


}
