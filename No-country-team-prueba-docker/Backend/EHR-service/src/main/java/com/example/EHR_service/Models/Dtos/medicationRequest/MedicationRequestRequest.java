package com.example.EHR_service.Models.Dtos.medicationRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class MedicationRequestRequest {
    @NotBlank
    private String patientId; // ID del paciente (Patient/{id})

    @NotBlank
    private String medicationId; // ID del medicamento (Medication/{id})

    private String encounterId; // opcional

    @NotBlank
    private String practitionerId; // ID del médico (Practitioner/{id})

    @NotBlank
    private String status; // "active", "completed", "draft"

    @NotBlank
    private String intent; // "order", "plan"

    private String dosageInstruction; // texto libre, ej: "Tomar 1 comprimido cada 8h"

    @NotNull
    private LocalDateTime authoredOn;
}
