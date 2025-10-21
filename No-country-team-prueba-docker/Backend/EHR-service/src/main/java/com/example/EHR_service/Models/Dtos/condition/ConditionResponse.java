package com.example.EHR_service.Models.Dtos.condition;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConditionResponse {

    private String id; // ID FHIR asignado
    private String patientId;
    private String encounterId;
    private String description;
    private String clinicalStatus;
    private String severity;
    private LocalDateTime onsetDateTime;
}
