package com.example.EHR_service.Models.Dtos.encounter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EncounterRequest {
    @NotBlank
    private String patientId; // referencia al paciente (Patient/123)

    @NotBlank
    private String status; // Ej: "in-progress", "finished"

    private String encounterClass; // Ej: "ambulatory", "inpatient"

    private String practitionerId; // que medico atendio

    @NotNull
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String reason; // motivo o diagnóstico inicial

    private String location;
}
