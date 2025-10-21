package com.example.EHR_service.Models.Dtos.fullEncounter;

import com.example.EHR_service.Models.Dtos.condition.ConditionResponse;
import com.example.EHR_service.Models.Dtos.encounter.EncounterResponse;
import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestResponse;
import com.example.EHR_service.Models.Dtos.observation.ObservationResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FullEncounterResponse {
    private EncounterResponse encounter;
    private List<ConditionResponse> conditions;
    private List<ObservationResponse> observations;
    private List<MedicationRequestResponse> medications;
}
