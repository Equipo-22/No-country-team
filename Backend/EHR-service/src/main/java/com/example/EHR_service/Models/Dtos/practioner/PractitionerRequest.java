package com.example.EHR_service.Models.Dtos.practioner;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PractitionerRequest {
    // --- DATOS PERSONALES ---
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String gender; // "male", "female", "other", "unknown"

    // --- IDENTIFICADORES ---
    private String licenseNumber;  // matrícula profesional
    private String hospitalId;     // ID interno del hospital

    // --- CONTACTO ---
    private String phone;

    @Email
    private String email;

    private String address;

    // --- PROFESIÓN / ESPECIALIDAD ---
    private String qualification;  // Ej: "Cardiólogo", "Pediatra", etc.

}
