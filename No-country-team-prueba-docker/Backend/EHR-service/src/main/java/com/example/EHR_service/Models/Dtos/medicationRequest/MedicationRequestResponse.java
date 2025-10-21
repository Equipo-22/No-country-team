package com.example.EHR_service.Models.Dtos.medicationRequest;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicationRequestResponse {
    private String id; // ID de la prescripción en el servidor FHIR

    private String patientId;
    private String medicationId;
    private String practitionerId;
    private String encounterId;

    private String status;
    private String intent;
    private String dosageInstruction;
    private LocalDateTime authoredOn;

}
