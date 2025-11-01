package com.example.appointment_service.Models.Dtos;

import com.example.appointment_service.Models.Enums.AppointmentType;

import java.time.LocalDateTime;
import java.util.UUID;

public record AppointmentRequest(
        UUID patientId,
        UUID professionalId,
        AppointmentType type,
        String lugar,
        String motivo,
        LocalDateTime startTime,
        LocalDateTime endTime
) {

}
