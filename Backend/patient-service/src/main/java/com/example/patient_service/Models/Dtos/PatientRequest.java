package com.example.patient_service.Models.Dtos;

import java.time.LocalDate;
import java.util.UUID;

public record PatientRequest(
        UUID userId,
        String nombre,
        String apellido,
        String email,
        String dni,
        String genero,
        LocalDate fechaNacimiento,
        String cobertura,
        String telefono,
        String direccion,
        String obraSocial,
        String numeroAfiliado
) {
}
