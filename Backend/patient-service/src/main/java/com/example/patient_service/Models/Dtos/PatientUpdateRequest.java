package com.example.patient_service.Models.Dtos;

import java.time.LocalDate;

public record PatientUpdateRequest(
        String nombre,
        String apellido,
        String genero,
        LocalDate fechaNacimiento,
        String cobertura,
        String telefono,
        String direccion,
        String obraSocial,
        String numeroAfiliado
) {
}
