package com.example.EHR_service.Models.Dtos.patientHistory;

import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterResponse;
import com.example.EHR_service.Models.Dtos.patient.PatientResponseFhir;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientHistoryResponse {
    private PatientResponseFhir patient;
    private PaginatedResponse<FullEncounterResponse>fullEncounters;
}
