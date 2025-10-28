package com.example.appointment_service.Models.Entities;

import com.example.appointment_service.Models.Enums.AppointmentStatus;
import com.example.appointment_service.Models.Enums.AppointmentType;
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
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID patientId;

    @Column(nullable = false)
    private UUID professionalId;

    private AppointmentType type;

    private String lugar;

    private String motivo;

    private String meetingUrl = null;

    private String eventId;      // ID del evento de Calendar

    // Fecha y hora de inicio de la sesión
    private LocalDateTime startTime;

    // Fecha y hora de finalización
    private LocalDateTime endTime;

    // Estado de la sesión (PENDING, COMPLETED, CANCELLED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    // Fecha de creación
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();


}
