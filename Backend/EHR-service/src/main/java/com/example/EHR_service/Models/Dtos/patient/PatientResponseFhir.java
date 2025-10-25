package com.example.EHR_service.Models.Dtos.patient;



import java.util.Date;

public record PatientResponseFhir(
        String id,
        String firstName,
        String lastName,
        Date birthDate,
        String gender,// "male", "female", "other", "unknown"

        // Identificadores
        String nationalId,   // DNI o pasaporte
        String hospitalId,// ID interno del hospital

        // Contacto
        String phone,
        String email,
        String address,

        // Contacto de emergencia
        String emergencyContactName,
        String emergencyContactPhone,
        String emergencyContactRelationship
    )
{
}
