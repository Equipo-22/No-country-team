package com.example.EHR_service.Models.Dtos.condition;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConditionRequest {
    @NotBlank
    private String patientId; // referencia al paciente
    @NotBlank
    private String encounterId;
    @NotBlank
    private String description; // código o descripción de la condición (ej: "Hypertension")

    private String clinicalStatus; // ej: "active", "resolved"

    private String severity; // opcional (ej: "mild", "moderate", "severe")

    private LocalDateTime onsetDateTime; //fecha del inicio
}
