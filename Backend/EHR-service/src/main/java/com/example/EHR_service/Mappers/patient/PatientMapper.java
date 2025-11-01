package com.example.EHR_service.Mappers.patient;

import com.example.EHR_service.Models.Dtos.patient.PatientRequest;
import com.example.EHR_service.Models.Dtos.patient.PatientResponseFhir;
import org.hl7.fhir.r4.model.*;

import java.util.Date;
import java.util.Optional;

public class PatientMapper {
    public static Patient toFhir(PatientRequest dto) {
        Patient patient = new Patient();

        // --- NOMBRE ---
        HumanName name = new HumanName()
                .setFamily(dto.getLastName())
                .addGiven(dto.getFirstName());
        patient.addName(name);

        // --- GÉNERO ---
        switch (dto.getGender().toLowerCase()) {
            case "male":
                patient.setGender(Enumerations.AdministrativeGender.MALE);
                break;
            case "female":
                patient.setGender(Enumerations.AdministrativeGender.FEMALE);
                break;
            case "other":
                patient.setGender(Enumerations.AdministrativeGender.OTHER);
                break;
            default:
                patient.setGender(Enumerations.AdministrativeGender.UNKNOWN);
        }

        // --- FECHA DE NACIMIENTO ---
        patient.setBirthDate(dto.getBirthDate());

        // --- IDENTIFICADORES ---
        if (dto.getNationalId() != null) {
            patient.addIdentifier()
                    .setSystem("http://hospital.com/patients/nationalId")
                    .setValue(dto.getNationalId());
        }
        if (dto.getHospitalId() != null) {
            patient.addIdentifier()
                    .setSystem("http://hospital.com/patients/hospitalId")
                    .setValue(dto.getHospitalId());
        }

        // --- CONTACTO ---
        if (dto.getPhone() != null) {
            patient.addTelecom(new ContactPoint()
                    .setSystem(ContactPoint.ContactPointSystem.PHONE)
                    .setValue(dto.getPhone())
                    .setUse(ContactPoint.ContactPointUse.HOME));
        }
        if (dto.getEmail() != null) {
            patient.addTelecom(new ContactPoint()
                    .setSystem(ContactPoint.ContactPointSystem.EMAIL)
                    .setValue(dto.getEmail())
                    .setUse(ContactPoint.ContactPointUse.HOME));
        }

        // --- DIRECCIÓN ---
        if (dto.getAddress() != null) {
            Address address = new Address();
            address.addLine(dto.getAddress());
            patient.addAddress(address);
        }

        // --- CONTACTO DE EMERGENCIA ---
        if (dto.getEmergencyContactName() != null || dto.getEmergencyContactPhone() != null) {
            Patient.ContactComponent contact = new Patient.ContactComponent();

            // Nombre
            if (dto.getEmergencyContactName() != null) {
                HumanName contactName = new HumanName();
                contactName.setText(dto.getEmergencyContactName());
                contact.setName(contactName);
            }

            // Teléfono
            if (dto.getEmergencyContactPhone() != null) {
                contact.addTelecom(new ContactPoint()
                        .setSystem(ContactPoint.ContactPointSystem.PHONE)
                        .setValue(dto.getEmergencyContactPhone())
                        .setUse(ContactPoint.ContactPointUse.HOME));
            }

            // Relación
            if (dto.getEmergencyContactRelationship() != null) {
                contact.addRelationship().setText(dto.getEmergencyContactRelationship());
            }

            patient.addContact(contact);
        }

        return patient;
    }


    public static PatientResponseFhir toDto(Patient patient) {

        String patientId=patient.getIdElement().getIdPart();
        // --- NOMBRE ---
        String firstName = Optional.ofNullable(patient.getNameFirstRep().getGivenAsSingleString())
                .orElse("");
        String lastName = Optional.ofNullable(patient.getNameFirstRep().getFamily())
                .orElse("");

        // --- FECHA Y GÉNERO ---
        Date birthDate = patient.getBirthDate();
        String gender = patient.getGender() != null ? patient.getGender().toCode() : "unknown";

        // --- IDENTIFICADORES ---
        String nationalId = patient.getIdentifier().stream()
                .filter(id -> "http://hospital.com/patients/nationalId".equals(id.getSystem()))
                .map(Identifier::getValue)
                .findFirst()
                .orElse(null);

        String hospitalId = patient.getIdentifier().stream()
                .filter(id -> "http://hospital.com/patients/hospitalId".equals(id.getSystem()))
                .map(Identifier::getValue)
                .findFirst()
                .orElse(null);

        // --- CONTACTO ---
        String phone = patient.getTelecom().stream()
                .filter(tp -> tp.getSystem() == ContactPoint.ContactPointSystem.PHONE)
                .map(ContactPoint::getValue)
                .findFirst()
                .orElse(null);

        String email = patient.getTelecom().stream()
                .filter(tp -> tp.getSystem() == ContactPoint.ContactPointSystem.EMAIL)
                .map(ContactPoint::getValue)
                .findFirst()
                .orElse(null);

        // --- DIRECCIÓN ---
        String address = patient.getAddressFirstRep() != null ?
                String.join(", ", patient.getAddressFirstRep().getLine().stream().map(Object::toString).toList()) :
                null;

        // --- CONTACTO DE EMERGENCIA ---
        String emergencyContactName = null;
        String emergencyContactPhone = null;
        String emergencyContactRelationship = null;

        if (!patient.getContact().isEmpty()) {
            Patient.ContactComponent contact = patient.getContactFirstRep();

            emergencyContactName = contact.getName() != null ? contact.getName().getText() : null;

            emergencyContactPhone = contact.getTelecom().stream()
                    .filter(tp -> tp.getSystem() == ContactPoint.ContactPointSystem.PHONE)
                    .map(ContactPoint::getValue)
                    .findFirst()
                    .orElse(null);

            emergencyContactRelationship = !contact.getRelationship().isEmpty() ?
                    contact.getRelationshipFirstRep().getText() : null;
        }

        return new PatientResponseFhir(
                patientId,
                firstName,
                lastName,
                birthDate,
                gender,
                nationalId,
                hospitalId,
                phone,
                email,
                address,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactRelationship
        );
    }
}
