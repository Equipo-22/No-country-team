package com.example.EHR_service.Mappers.medication;

import com.example.EHR_service.Models.Dtos.medication.MedicationRequest;
import com.example.EHR_service.Models.Dtos.medication.MedicationResponse;
import org.hl7.fhir.r4.model.*;

import java.time.ZoneOffset;
import java.util.Date;

public class MedicationMapper {
    public static Medication toFhir(MedicationRequest dto) {
        Medication medication = new Medication();

        // Nombre / Código
        medication.setCode(new CodeableConcept().setText(dto.getName()));

        // Forma farmacéutica
        if (dto.getForm() != null) {
            medication.setForm(new CodeableConcept().setText(dto.getForm()));
        }

        // Fabricante
        if (dto.getManufacturer() != null) {
            Organization org = new Organization();
            org.setName(dto.getManufacturer());
            medication.setManufacturer(new Reference(org));
        }

        // Número de lote
        if (dto.getLotNumber() != null) {
            Medication.MedicationBatchComponent batch = new Medication.MedicationBatchComponent();
            batch.setLotNumber(dto.getLotNumber());

            if (dto.getExpirationDate() != null) {
                batch.setExpirationDate(Date.from(dto.getExpirationDate().atStartOfDay()
                        .toInstant(ZoneOffset.UTC)));
            }

            medication.setBatch(batch);
        }

        // Ingrediente (simplificado como primer ingrediente)
        if (dto.getIngredient() != null) {
            Medication.MedicationIngredientComponent ingredient = new Medication.MedicationIngredientComponent();
            ingredient.setItem(new CodeableConcept().setText(dto.getIngredient()));
            medication.addIngredient(ingredient);
        }

        return medication;
    }

    public static MedicationResponse fromFhir(Medication medication) {
        MedicationResponse dto = new MedicationResponse();

        dto.setId(medication.getIdElement().getIdPart());
        dto.setName(medication.getCode() != null ? medication.getCode().getText() : null);
        dto.setForm(medication.getForm() != null ? medication.getForm().getText() : null);
        dto.setManufacturer(medication.getManufacturer() != null ? medication.getManufacturer().getDisplay() : null);

        if (medication.getBatch() != null) {
            dto.setLotNumber(medication.getBatch().getLotNumber());
            if (medication.getBatch().getExpirationDate() != null) {
                dto.setExpirationDate(
                        medication.getBatch().getExpirationDate().toInstant()
                                .atOffset(ZoneOffset.UTC)
                                .toLocalDate()
                );
            }
        }

        if (!medication.getIngredient().isEmpty()) {
            Type item = medication.getIngredientFirstRep().getItem();
            if (item instanceof CodeableConcept cc) {
                dto.setIngredient(cc.getText());
            } else if (item instanceof Reference ref) {
                dto.setIngredient(ref.getReference());
            }        }

        return dto;
    }
}
