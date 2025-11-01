package com.example.EHR_service.Mappers.encounter;

import com.example.EHR_service.Models.Dtos.encounter.EncounterRequest;
import com.example.EHR_service.Models.Dtos.encounter.EncounterResponse;
import org.hl7.fhir.r4.model.*;

import java.time.ZoneOffset;
import java.util.Date;

public class EncounterMapper {
    public static Encounter toFhir(EncounterRequest dto) {
        Encounter encounter = new Encounter();

        // Paciente
        encounter.setSubject(new Reference("Patient/" + dto.getPatientId()));

        // Estado
        encounter.setStatus(Encounter.EncounterStatus.fromCode(dto.getStatus()));

        // Clase del encuentro
        if (dto.getEncounterClass() != null) {
            encounter.setClass_(new Coding().setCode(dto.getEncounterClass()));
        }

        // Profesional (practitioner)
        if (dto.getPractitionerId() != null) {
            Encounter.EncounterParticipantComponent participant = new Encounter.EncounterParticipantComponent();
            participant.setIndividual(new Reference("Practitioner/" + dto.getPractitionerId()));
            encounter.addParticipant(participant);
        }

        // Período
        Period period = new Period();
        if (dto.getStartDate() != null) {
            period.setStart(Date.from(dto.getStartDate().atZone(ZoneOffset.UTC).toInstant()));
        }
        if (dto.getEndDate() != null) {
            period.setEnd(Date.from(dto.getEndDate().atZone(ZoneOffset.UTC).toInstant()));
        }
        encounter.setPeriod(period);

        // Motivo (reason)
        if (dto.getReason() != null) {
            encounter.addReasonCode(new CodeableConcept().setText(dto.getReason()));
        }

        // Ubicación
        if (dto.getLocation() != null) {
            Encounter.EncounterLocationComponent locationComponent = new Encounter.EncounterLocationComponent();
            locationComponent.setLocation(new Reference(dto.getLocation()));
            encounter.addLocation(locationComponent);
        }

        return encounter;
    }

    public static EncounterResponse toDto(Encounter encounter) {
        EncounterResponse dto = new EncounterResponse();

        dto.setId(encounter.getIdElement().getIdPart());
        dto.setPatientId(encounter.getSubject() != null ? encounter.getSubject().getReference() : null);
        dto.setStatus(encounter.getStatus() != null ? encounter.getStatus().toCode() : null);
        dto.setEncounterClass(encounter.getClass_() != null ? encounter.getClass_().getCode() : null);

        if (!encounter.getParticipant().isEmpty()) {
            dto.setPractitionerId(encounter.getParticipantFirstRep().getIndividual().getReference());
        }

        if (encounter.getPeriod() != null) {
            Period p = encounter.getPeriod();
            if (p.getStart() != null) {
                dto.setStartDate(p.getStart().toInstant().atZone(ZoneOffset.UTC).toLocalDateTime());
            }
            if (p.getEnd() != null) {
                dto.setEndDate(p.getEnd().toInstant().atZone(ZoneOffset.UTC).toLocalDateTime());
            }
        }

        if (!encounter.getReasonCode().isEmpty()) {
            dto.setReason(encounter.getReasonCodeFirstRep().getText());
        }

        if (!encounter.getLocation().isEmpty()) {
            dto.setLocation(encounter.getLocationFirstRep().getLocation().getReference());
        }

        return dto;
    }
}
