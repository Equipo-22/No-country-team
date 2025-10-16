package com.example.EHR_service.Mappers.condition;

import com.example.EHR_service.Models.Dtos.condition.ConditionRequest;
import com.example.EHR_service.Models.Dtos.condition.ConditionResponse;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Condition;
import org.hl7.fhir.r4.model.DateTimeType;
import org.hl7.fhir.r4.model.Reference;

import java.time.ZoneOffset;

public class ConditionMapper {

    public static Condition toFhir(ConditionRequest dto) {
        Condition condition = new Condition();

        if (dto.getEncounterId() != null) {
            condition.setEncounter(new Reference("Encounter/" + dto.getEncounterId()));
        }
        // Referencia al paciente
        condition.setSubject(new Reference("Patient/" + dto.getPatientId()));

        // Código o descripción
        condition.setCode(new CodeableConcept().setText(dto.getDescription()));

        // Estado clínico
        if (dto.getClinicalStatus() != null) {
            condition.setClinicalStatus(new CodeableConcept().setText(dto.getClinicalStatus()));
        }

        // Severidad
        if (dto.getSeverity() != null) {
            condition.setSeverity(new CodeableConcept().setText(dto.getSeverity()));
        }

        // Fecha de inicio
        if (dto.getOnsetDateTime() != null) {
            condition.setOnset(new DateTimeType(dto.getOnsetDateTime().atZone(ZoneOffset.UTC).toInstant().toString()));
        }

        return condition;
    }

    public static ConditionResponse toDto(Condition condition) {
        ConditionResponse dto = new ConditionResponse();

        dto.setId(condition.getIdElement().getIdPart());
        dto.setPatientId(condition.getSubject().getReference());
        dto.setEncounterId(condition.getEncounter() != null ? condition.getEncounter().getReference() : null);
        dto.setDescription(condition.getCode() != null ? condition.getCode().getText() : null);
        dto.setClinicalStatus(condition.getClinicalStatus() != null ? condition.getClinicalStatus().getText() : null);
        dto.setSeverity(condition.getSeverity() != null ? condition.getSeverity().getText() : null);

        if (condition.getOnsetDateTimeType() != null) {
            dto.setOnsetDateTime(condition.getOnsetDateTimeType().getValue().toInstant().atOffset(ZoneOffset.UTC).toLocalDateTime());
        }

        return dto;
    }
}
