package com.example.EHR_service.Models.Dtos.fullEncounter;

import com.example.EHR_service.Models.Dtos.condition.ConditionRequest;
import com.example.EHR_service.Models.Dtos.encounter.EncounterRequest;
import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestRequest;
import com.example.EHR_service.Models.Dtos.observation.ObservationRequest;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class FullEncounterRequest {
    @NotNull
    private EncounterRequest encounter;

    private List<ConditionRequest> conditions;
    private List<ObservationRequest> observations;
    private List<MedicationRequestRequest> medications;
}
