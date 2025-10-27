package com.example.appointment_service.Models.Dtos;


import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public record DoctorResponseDTO(
        UUID id,
        String firstName,
        String lastName,
        String licenseNumber,
        String specialty,
        String gender,
        LocalDate birthDate,
        String email,
        String phone,
        OffsetDateTime createdAt,
        boolean enabled
) {
}
