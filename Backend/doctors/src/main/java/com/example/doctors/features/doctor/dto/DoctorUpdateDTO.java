package com.example.doctors.features.doctor.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Schema(description = "Datos necesarios para editar un doctor")
public record DoctorUpdateDTO(

        @Schema(description = "Nombre del doctor", example = "Tom")
        String firstName,

        @Schema(description = "Apellidos del doctor", example = "Torres")
        String lastName,

        @Schema(description = "Número de colegiatura/licencia médica", example = "1234567890")
        String licenseNumber,

        @Schema(description = "Especialidad", example = "Cardiología")
        String specialty,

        @Schema(description = "Género", example = "male")
        String gender,

        @Schema(description = "Fecha de nacimiento", example = "2000-10-25")
        LocalDate birthDate,

        @Schema(description = "Correo electrónico", example = "tom.torres@gmail.com")
        String email,

        @Schema(description = "Número de celular", example = "987963451")
        String phone,

        @Schema(description = "Indicador de existencia", example = "true")
        Boolean enabled
) {
}
