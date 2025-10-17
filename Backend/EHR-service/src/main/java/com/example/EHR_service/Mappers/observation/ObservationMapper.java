package com.example.EHR_service.Mappers.observation;

import com.example.EHR_service.Models.Dtos.observation.ObservationRequest;
import com.example.EHR_service.Models.Dtos.observation.ObservationResponse;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Reference;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class ObservationMapper {
    // Convierte DTO de request a recurso FHIR Observation
    public static Observation toFhir(ObservationRequest dto) {
        Observation observation = new Observation();

        // --- STATUS ---
        observation.setStatus(Observation.ObservationStatus.FINAL);

        // --- CÓDIGO / DESCRIPCIÓN ---
        observation.getCode().setText(dto.getDescripcion());

        // --- PACIENTE ---
        observation.setSubject(new Reference("Patient/" + dto.getPacienteId()));

        // --- CITA / Encounter ---
        if (dto.getEncounterId() != null) {
            observation.setEncounter(new Reference("Encounter/" + dto.getEncounterId()));
        }

        // --- FECHA / hora ---
        if (dto.getFecha() != null) {
            observation.setEffective(
                    new org.hl7.fhir.r4.model.DateTimeType(
                            Date.from(dto.getFecha().atZone(ZoneId.systemDefault()).toInstant())
                    )
            );
        }

        // --- VALOR ---
        if (dto.getValor() != null) {
            observation.setValue(new org.hl7.fhir.r4.model.StringType(dto.getValor()));
        }

        return observation;
    }

    // Convierte recurso FHIR Observation a DTO de response
    public static ObservationResponse toDto(Observation observation) {

        String observationId=observation.getIdElement().getIdPart();

        String pacienteId = observation.getSubject() != null ?
                observation.getCode().getText():null;

        String encounterId = observation.getEncounter() != null ?
                observation.getCode().getText():null;

        String descripcion = observation.getCode() != null ? observation.getCode().getText() : null;

        String valor = null;
        if (observation.getValue() instanceof org.hl7.fhir.r4.model.StringType) {
            valor = ((org.hl7.fhir.r4.model.StringType) observation.getValue()).getValue();
        }

        LocalDateTime fecha = null;
        if (observation.getEffective() instanceof org.hl7.fhir.r4.model.DateTimeType) {
            Date date = ((org.hl7.fhir.r4.model.DateTimeType) observation.getEffective()).getValue();
            if (date != null) {
                fecha = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            }
        }

        return new ObservationResponse(
                observationId,
                pacienteId,
                descripcion,
                valor,
                fecha,
                encounterId
        );
    }
}
