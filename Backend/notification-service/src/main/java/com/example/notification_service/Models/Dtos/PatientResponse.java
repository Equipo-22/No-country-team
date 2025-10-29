package com.example.notification_service.Models.Dtos;

import java.time.LocalDate;
import java.util.UUID;

public record PatientResponse(
        UUID id,
        UUID userId,
        String nombre,
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
