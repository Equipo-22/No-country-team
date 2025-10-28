package com.example.EHR_service.Services;

import com.example.EHR_service.Clients.AppointmentClient;
import com.example.EHR_service.Clients.DoctorClient;
import com.example.EHR_service.Mappers.condition.ConditionMapper;
import com.example.EHR_service.Mappers.encounter.EncounterMapper;
import com.example.EHR_service.Mappers.fullEncounter.FullEncounterMapper;
import com.example.EHR_service.Mappers.medicationRequest.MedicationRequestMapper;
import com.example.EHR_service.Mappers.observation.ObservationMapper;
import com.example.EHR_service.Models.Dtos.appointment.AppointmentResponse;
import com.example.EHR_service.Models.Dtos.condition.ConditionRequest;
import com.example.EHR_service.Models.Dtos.condition.ConditionResponse;
import com.example.EHR_service.Models.Dtos.encounter.EncounterRequest;
import com.example.EHR_service.Models.Dtos.encounter.EncounterResponse;
import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterDetailsResponse;
import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterRequest;
import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterResponse;
import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestRequest;
import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestResponse;
import com.example.EHR_service.Models.Dtos.observation.ObservationRequest;
import com.example.EHR_service.Models.Dtos.observation.ObservationResponse;
import com.example.EHR_service.Models.Dtos.practioner.DoctorResponseDTO;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.*;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class FullEncounterService {
    private final FhirService fhirService;
    private final DoctorClient doctorClient;
    private final AppointmentClient appointmentClient;

    public FullEncounterDetailsResponse createFullEncounter(FullEncounterRequest fullEncounterRequest){
        AppointmentResponse appointment=appointmentClient.getAppointmentById(fullEncounterRequest.getAppointmentId());
        DoctorResponseDTO doctor=doctorClient.findById(appointment.professionalId());

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

        return new FullEncounterDetailsResponse(
                doctor,
                appointment,
                conditions,
                observations,
                medicationRequests);
    }

    public FullEncounterDetailsResponse getFullEncounter(String encounter_id){
        Bundle bundle=fhirService.getEncounterWithRelatedResources(encounter_id);
        FullEncounterResponse fullResponse=FullEncounterMapper.toDto(bundle);

        AppointmentResponse appointment=appointmentClient.getAppointmentById(UUID.fromString(encounter_id));
        DoctorResponseDTO doctor=doctorClient.findById(appointment.professionalId());

        return new FullEncounterDetailsResponse(
                doctor,
                appointment,
                fullResponse.getConditions(),
                fullResponse.getObservations(),
                fullResponse.getMedications());
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
