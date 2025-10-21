package com.example.EHR_service.Mappers.medicationRequest;

import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestRequest;
import com.example.EHR_service.Models.Dtos.medicationRequest.MedicationRequestResponse;
import org.hl7.fhir.r4.model.Dosage;
import org.hl7.fhir.r4.model.MedicationRequest;
import org.hl7.fhir.r4.model.Reference;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class MedicationRequestMapper {
    public static MedicationRequest toFhir(MedicationRequestRequest dto) {
        MedicationRequest medReq = new MedicationRequest();

        // --- STATUS ---
        medReq.setStatus(MedicationRequest.MedicationRequestStatus.fromCode(dto.getStatus().toLowerCase()));

        // --- INTENT ---
        medReq.setIntent(MedicationRequest.MedicationRequestIntent.fromCode(dto.getIntent().toLowerCase()));

        // --- MEDICATION ---
        medReq.setMedication(new Reference("Medication/" + dto.getMedicationId()));

        // --- PACIENTE ---
        medReq.setSubject(new Reference("Patient/" + dto.getPatientId()));

        // --- PRACTITIONER (médico que prescribe) ---
        medReq.setRequester(new Reference("Practitioner/" + dto.getPractitionerId()));

        // --- ENCOUNTER (opcional) ---
        if (dto.getEncounterId() != null) {
            medReq.setEncounter(new Reference("Encounter/" + dto.getEncounterId()));
        }

        // --- DOSAGE INSTRUCTION ---
        if (dto.getDosageInstruction() != null) {
            Dosage dosage = new Dosage();
            dosage.setText(dto.getDosageInstruction());
            medReq.addDosageInstruction(dosage);
        }

        // --- AUTHORED ON ---
        if (dto.getAuthoredOn() != null) {
            Date authoredDate = Date.from(dto.getAuthoredOn().atZone(ZoneId.systemDefault()).toInstant());
            medReq.setAuthoredOn(authoredDate);
        }

        return medReq;
    }

    // --- FHIR Resource → RESPONSE DTO ---
    public static MedicationRequestResponse toDto(MedicationRequest medReq) {
        MedicationRequestResponse dto = new MedicationRequestResponse();

        // --- ID ---
        dto.setId(medReq.getIdElement().getIdPart());

        // --- PACIENTE ---
        if (medReq.getSubject() != null && medReq.getSubject().getReferenceElement() != null) {
            dto.setPatientId(medReq.getSubject().getReferenceElement().getIdPart());
        }

        // --- MEDICATION ---
        if (medReq.hasMedicationReference()) {
            dto.setMedicationId(medReq.getMedicationReference().getReferenceElement().getIdPart());
        }

        // --- PRACTITIONER ---
        if (medReq.getRequester() != null && medReq.getRequester().getReferenceElement() != null) {
            dto.setPractitionerId(medReq.getRequester().getReferenceElement().getIdPart());
        }

        // --- ENCOUNTER ---
        if (medReq.getEncounter() != null && medReq.getEncounter().getReferenceElement() != null) {
            dto.setEncounterId(medReq.getEncounter().getReferenceElement().getIdPart());
        }

        // --- STATUS ---
        if (medReq.getStatus() != null) {
            dto.setStatus(medReq.getStatus().toCode());
        }

        // --- INTENT ---
        if (medReq.getIntent() != null) {
            dto.setIntent(medReq.getIntent().toCode());
        }

        // --- DOSAGE INSTRUCTION ---
        if (!medReq.getDosageInstruction().isEmpty()) {
            dto.setDosageInstruction(medReq.getDosageInstructionFirstRep().getText());
        }

        // --- AUTHORED ON ---
        if (medReq.getAuthoredOn() != null) {
            LocalDateTime authoredOn = medReq.getAuthoredOn().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
            dto.setAuthoredOn(authoredOn);
        }

        return dto;
    }
}
