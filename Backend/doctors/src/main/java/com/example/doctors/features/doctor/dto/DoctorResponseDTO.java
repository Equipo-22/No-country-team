package com.example.doctors.features.doctor.dto;

import com.example.doctors.features.doctor.model.Doctor;

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
    public DoctorResponseDTO(Doctor doctor) {
        this(
                doctor.getId(),
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getLicenseNumber(),
                doctor.getSpecialty(),
                doctor.getGender(),
                doctor.getBirthDate(),
                doctor.getEmail(),
                doctor.getPhone(),
                doctor.getCreatedAt(),
                doctor.isEnabled()
        );
    }
}
