package com.example.EHR_service.Mappers.fullEncounter;

import com.example.EHR_service.Mappers.medicationRequest.MedicationRequestMapper;
import com.example.EHR_service.Mappers.observation.ObservationMapper;
import com.example.EHR_service.Mappers.condition.ConditionMapper;
import com.example.EHR_service.Mappers.encounter.EncounterMapper;
import com.example.EHR_service.Models.Dtos.condition.ConditionResponse;
import com.example.EHR_service.Models.Dtos.encounter.EncounterResponse;
import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterResponse;
import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestResponse;
import com.example.EHR_service.Models.Dtos.observation.ObservationResponse;
import org.hl7.fhir.r4.model.*;

import java.util.*;
import java.util.stream.Collectors;

public class FullEncounterMapper {
    public static FullEncounterResponse toDto(Bundle bundle){

        Map<String, Encounter> encounterMap = new HashMap<>();
        Map<String, List<Condition>> condMap = new HashMap<>();
        Map<String, List<Observation>> obsMap = new HashMap<>();
        Map<String, List<MedicationRequest>> medMap = new HashMap<>();

        Encounter encounter = null;

        for (Bundle.BundleEntryComponent entry : bundle.getEntry()) {
            Resource resource = entry.getResource();

            if (resource instanceof Encounter enc) {
                encounter = enc;
                encounterMap.put(enc.getIdElement().getIdPart(), enc);

            } else if (resource instanceof Condition cond && cond.hasEncounter()) {
                String encId = cond.getEncounter().getReferenceElement().getIdPart();
                condMap.computeIfAbsent(encId, k -> new ArrayList<>()).add(cond);

            } else if (resource instanceof Observation obs && obs.hasEncounter()) {
                String encId = obs.getEncounter().getReferenceElement().getIdPart();
                obsMap.computeIfAbsent(encId, k -> new ArrayList<>()).add(obs);

            } else if (resource instanceof MedicationRequest med && med.hasEncounter()) {
                String encId = med.getEncounter().getReferenceElement().getIdPart();
                medMap.computeIfAbsent(encId, k -> new ArrayList<>()).add(med);
            }
        }
        return toFullEncounterResponse(encounter, condMap, obsMap, medMap);
    }
    public static FullEncounterResponse toFullEncounterResponse(
            Encounter encounter,
            Map<String, List<Condition>> condMap,
            Map<String, List<Observation>> obsMap,
            Map<String, List<MedicationRequest>> medMap) {

        String encId = encounter.getIdElement().getIdPart();

        List<ConditionResponse> conditions = Optional.ofNullable(condMap.get(encId))
                .orElse(Collections.emptyList())
                .stream()
                .map(ConditionMapper::toDto)
                .collect(Collectors.toList());

        List<ObservationResponse> observations = Optional.ofNullable(obsMap.get(encId))
                .orElse(Collections.emptyList())
                .stream()
                .map(ObservationMapper::toDto)
                .collect(Collectors.toList());

        List<MedicationRequestResponse> medications = Optional.ofNullable(medMap.get(encId))
                .orElse(Collections.emptyList())
                .stream()
                .map(MedicationRequestMapper::toDto)
                .collect(Collectors.toList());

        EncounterResponse encounterResponse = EncounterMapper.toDto(encounter);

        FullEncounterResponse fullEncounter = new FullEncounterResponse();
        fullEncounter.setConditions(conditions);
        fullEncounter.setObservations(observations);
        fullEncounter.setMedications(medications);

        return fullEncounter;
    }
}
