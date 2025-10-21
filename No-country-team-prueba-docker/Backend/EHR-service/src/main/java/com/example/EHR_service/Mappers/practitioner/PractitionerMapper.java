package com.example.EHR_service.Mappers.practitioner;

import com.example.EHR_service.Models.Dtos.practioner.PractitionerRequest;
import com.example.EHR_service.Models.Dtos.practioner.PractitionerResponse;
import org.hl7.fhir.r4.model.*;

public class PractitionerMapper {
    public static Practitioner toFhir(PractitionerRequest dto) {
        Practitioner practitioner = new Practitioner();

        // --- NOMBRE ---
        HumanName name = new HumanName()
                .addGiven(dto.getFirstName())
                .setFamily(dto.getLastName());
        practitioner.addName(name);

        // --- GÉNERO ---
        if (dto.getGender() != null) {
            practitioner.setGender(Enumerations.AdministrativeGender.fromCode(dto.getGender().toLowerCase()));
        }

        // --- IDENTIFICADORES ---
        if (dto.getLicenseNumber() != null) {
            practitioner.addIdentifier(new Identifier().setSystem("LicenseNumber").setValue(dto.getLicenseNumber()));
        }
        if (dto.getHospitalId() != null) {
            practitioner.addIdentifier(new Identifier().setSystem("HospitalId").setValue(dto.getHospitalId()));
        }

        // --- CONTACTO ---
        if (dto.getPhone() != null) {
            practitioner.addTelecom(new ContactPoint()
                    .setSystem(ContactPoint.ContactPointSystem.PHONE)
                    .setValue(dto.getPhone()));
        }

        if (dto.getEmail() != null) {
            practitioner.addTelecom(new ContactPoint()
                    .setSystem(ContactPoint.ContactPointSystem.EMAIL)
                    .setValue(dto.getEmail()));
        }

        // --- DIRECCIÓN ---
        if (dto.getAddress() != null) {
            practitioner.addAddress(new Address().setText(dto.getAddress()));
        }

        // --- ESPECIALIDAD ---
        if (dto.getQualification() != null) {
            practitioner.addQualification(
                    new Practitioner.PractitionerQualificationComponent()
                            .setCode(new CodeableConcept().setText(dto.getQualification()))
            );
        }

        return practitioner;
    }

    public static PractitionerResponse toDto(Practitioner practitioner) {
        PractitionerResponse dto = new PractitionerResponse();

        dto.setId(practitioner.getIdElement().getIdPart());

        // --- NOMBRE ---
        if (!practitioner.getName().isEmpty()) {
            HumanName name = practitioner.getNameFirstRep();
            if (!name.getGiven().isEmpty()) {
                dto.setFirstName(name.getGivenAsSingleString());
            }
            dto.setLastName(name.getFamily());
        }

        // --- GÉNERO ---
        if (practitioner.getGender() != null) {
            dto.setGender(practitioner.getGender().toCode());
        }

        // --- IDENTIFICADORES ---
        for (Identifier id : practitioner.getIdentifier()) {
            switch (id.getSystem()) {
                case "LicenseNumber" -> dto.setLicenseNumber(id.getValue());
                case "HospitalId" -> dto.setHospitalId(id.getValue());
            }
        }

        // --- CONTACTO ---
        for (ContactPoint contact : practitioner.getTelecom()) {
            if (contact.getSystem() == ContactPoint.ContactPointSystem.PHONE) {
                dto.setPhone(contact.getValue());
            } else if (contact.getSystem() == ContactPoint.ContactPointSystem.EMAIL) {
                dto.setEmail(contact.getValue());
            }
        }

        // --- DIRECCIÓN ---
        if (!practitioner.getAddress().isEmpty()) {
            dto.setAddress(practitioner.getAddressFirstRep().getText());
        }

        // --- ESPECIALIDAD ---
        if (!practitioner.getQualification().isEmpty()) {
            dto.setQualification(practitioner.getQualificationFirstRep().getCode().getText());
        }

        return dto;
    }
}
