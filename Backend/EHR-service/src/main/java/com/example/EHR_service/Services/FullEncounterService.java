package com.example.EHR_service.Services;

import com.example.EHR_service.Mappers.condition.ConditionMapper;
import com.example.EHR_service.Mappers.encounter.EncounterMapper;
import com.example.EHR_service.Mappers.fullEncounter.FullEncounterMapper;
import com.example.EHR_service.Mappers.medicationRequest.MedicationRequestMapper;
import com.example.EHR_service.Mappers.observation.ObservationMapper;
import com.example.EHR_service.Models.Dtos.condition.ConditionRequest;
import com.example.EHR_service.Models.Dtos.condition.ConditionResponse;
import com.example.EHR_service.Models.Dtos.encounter.EncounterRequest;
import com.example.EHR_service.Models.Dtos.encounter.EncounterResponse;
import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterRequest;
import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterResponse;
import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestRequest;
import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestResponse;
import com.example.EHR_service.Models.Dtos.observation.ObservationRequest;
import com.example.EHR_service.Models.Dtos.observation.ObservationResponse;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.*;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class FullEncounterService {
    private final FhirService fhirService;

    public FullEncounterResponse createFullEncounter(FullEncounterRequest fullEncounterRequest){
        EncounterResponse encounterResponse = createEncounter(fullEncounterRequest.getEncounter());

        List<ObservationResponse>observations=Optional.ofNullable(fullEncounterRequest.getObservations())
                .orElse(Collections.emptyList())
                .stream()
                .map(this::createObservation)
                .toList();

        List<ConditionResponse> conditions= Optional.ofNullable(fullEncounterRequest.getConditions())
                .orElse(Collections.emptyList())
                .stream()
                .map(this::createCondition)
                .toList();

        List<MedicationRequestResponse> medicationRequests=Optional.ofNullable(fullEncounterRequest.getMedications())
                .orElse(Collections.emptyList())
                .stream().map(this::createMedicationRequest)
                .toList();

        return new FullEncounterResponse(
                encounterResponse,
                conditions,
                observations,
                medicationRequests);
    }

    public FullEncounterResponse getFullEncounter(String encounter_id){
        Bundle bundle=fhirService.getEncounterWithRelatedResources(encounter_id);
        return FullEncounterMapper.toDto(bundle);
    }

    private EncounterResponse createEncounter(EncounterRequest encounterRequest) {
        Encounter encounter= EncounterMapper.toFhir(encounterRequest);
        Encounter encounterSaved=fhirService.createEncounter(encounter);
        return EncounterMapper.toDto(encounterSaved);
    }

    private ObservationResponse createObservation(ObservationRequest observationRequest) {
        Observation observation= ObservationMapper.toFhir(observationRequest);
        Observation observationSaved=fhirService.createObservation(observation);
        return ObservationMapper.toDto(observationSaved);
    }

    private ConditionResponse createCondition(ConditionRequest conditionRequest) {
        Condition condition= ConditionMapper.toFhir(conditionRequest);
        Condition conditionSaved= fhirService.createCondition(condition);
        return ConditionMapper.toDto(conditionSaved);
    }

    private MedicationRequestResponse createMedicationRequest(MedicationRequestRequest medicationRequestRequest){
        MedicationRequest medicationRequest = MedicationRequestMapper.toFhir(medicationRequestRequest);
        MedicationRequest medicationRequestSaved=fhirService.createMedicationRequest(medicationRequest);
        return MedicationRequestMapper.toDto(medicationRequestSaved);
    }

}
