package com.example.EHR_service.Models.Dtos.practioner;


import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public record DoctorResponseDTO(
        UUID id,
        UUID userId,
        String name,
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
