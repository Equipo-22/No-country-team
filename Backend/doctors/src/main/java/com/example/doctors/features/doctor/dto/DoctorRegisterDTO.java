package com.example.doctors.features.doctor.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

@Schema(description = "Datos necesarios para crear un doctor")
public record DoctorRegisterDTO(
        @Schema(description = "Nombre del doctor", example = "Tom")
        @NotBlank(message = "El nombre no puede ser nulo")
        String firstName,

        @Schema(description = "Apellidos del doctor", example = "Torres")
        @NotBlank(message = "El apellido no puede ser nulo")
        String lastName,

        @Schema(description = "Número de colegiatura/licencia médica", example = "1234567890")
        @NotBlank(message = "El número de colegiatura/licencia no puede ser nula")
        String licenseNumber,

        @Schema(description = "Especialidad", example = "Cardiología")
        @NotBlank(message = "La especialidad no puede ser nula")
        String specialty,

        @Schema(description = "Género", example = "male")
        String gender,

        @Schema(description = "Fecha de nacimiento", example = "2000-10-25")
        LocalDate birthDate,

        @Schema(description = "Correo electrónico", example = "tom.torres@gmail.com")
        @NotBlank(message = "El correo no puede ser nulo")
        @Email(message = "Debe ingresar un correo válido")
        String email,

        @Schema(description = "Número de celular", example = "987963451")
        String phone
) {
}
