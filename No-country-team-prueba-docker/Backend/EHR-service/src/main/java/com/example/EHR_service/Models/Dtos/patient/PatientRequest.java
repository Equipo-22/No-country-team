package com.example.EHR_service.Models.Dtos.patient;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PatientRequest {
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull
    private Date birthDate;

    @NotBlank
    private String gender; // "male", "female", "other", "unknown"

    // Identificadores
    private String nationalId;   // DNI o pasaporte
    private String hospitalId;   // ID interno del hospital

    // Contacto
    private String phone;

    @Email
    private String email;

    private String address;

    // Contacto de emergencia
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String emergencyContactRelationship;

}
