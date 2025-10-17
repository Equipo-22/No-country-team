package com.example.EHR_service.Mappers.patientHistory;

import com.example.EHR_service.Mappers.fullEncounter.FullEncounterMapper;
import com.example.EHR_service.Mappers.patient.PatientMapper;
import com.example.EHR_service.Models.Dtos.patientHistory.PaginatedResponse;
import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterResponse;
import com.example.EHR_service.Models.Dtos.patient.PatientResponse;
import com.example.EHR_service.Models.Dtos.patientHistory.PatientHistoryResponse;
import org.hl7.fhir.r4.model.*;

import java.util.*;

public class PatientHistoryMapper {
    public static PatientHistoryResponse toDto(Bundle bundle, int page, int size) {

        // Mapas temporales
        Map<String, Encounter> encounterMap = new HashMap<>();
        Patient patient = null;
        Map<String, List<Condition>> condMap = new HashMap<>();
        Map<String, List<Observation>> obsMap = new HashMap<>();
        Map<String, List<MedicationRequest>> medMap = new HashMap<>();

        // Clasificar los recursos del Bundle
        for (Bundle.BundleEntryComponent entry : bundle.getEntry()) {
            Resource res = entry.getResource();

            if (res instanceof Encounter enc) {
                encounterMap.put(enc.getIdElement().getIdPart(), enc);

            } else if (res instanceof Patient pat) {
                patient = pat; // Solo hay un paciente

            } else if (res instanceof Condition cond && cond.getEncounter() != null) {
                String encId = cond.getEncounter().getReference().replace("Encounter/", "");
                condMap.computeIfAbsent(encId, k -> new ArrayList<>()).add(cond);

            } else if (res instanceof Observation obs && obs.getEncounter() != null) {
                String encId = obs.getEncounter().getReference().replace("Encounter/", "");
                obsMap.computeIfAbsent(encId, k -> new ArrayList<>()).add(obs);

            } else if (res instanceof MedicationRequest med && med.getEncounter() != null) {
                String encId = med.getEncounter().getReference().replace("Encounter/", "");
                medMap.computeIfAbsent(encId, k -> new ArrayList<>()).add(med);
            }
        }

        // Paciente
        PatientResponse patientResponse = null;
        if (patient != null) {
            patientResponse = PatientMapper.toDto(patient);
        }

        // Mapear cada Encounter a FullEncounterResponse
        List<FullEncounterResponse> fullEncounters = encounterMap.values().stream()
                .map(encounter -> FullEncounterMapper.toFullEncounterResponse(encounter, condMap, obsMap, medMap))
                .toList();

        // Paginación
        int totalItems = Optional.of(bundle.getTotal()).orElse(fullEncounters.size());
        int totalPages = (int) Math.ceil((double) totalItems / size);

        PaginatedResponse<FullEncounterResponse> paginated = new PaginatedResponse<>();
        paginated.setContent(fullEncounters);
        paginated.setCurrentPage(page);
        paginated.setTotalItems(totalItems);
        paginated.setTotalPages(totalPages);
        paginated.setPageSize(size);
        paginated.setHasNext(page < totalPages - 1);
        paginated.setHasPrevious(page > 0);

        return new PatientHistoryResponse(patientResponse, paginated);
    }

}
