package com.example.EHR_service.Kafka;

import com.example.EHR_service.Models.Dtos.patient.PatientResponse;
import com.example.EHR_service.Services.FhirService;
import com.example.EHR_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.*;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PatientConsumer {

    private final FhirService fhirService;

    @KafkaListener(topics = "patient_register-topic",groupId = "ehr-group")
    public void handlePatientSaved(String message){
        PatientResponse response= Jsonutils.fromJson(message,PatientResponse.class);
        Patient patient =new Patient();
        patient.setId(response.id().toString());

        // Nombre y apellido
        HumanName name = patient.addName();
        name.setFamily(response.apellido());
        name.addGiven(response.nombre());

        // Email
        ContactPoint email = patient.addTelecom();
        email.setSystem(ContactPoint.ContactPointSystem.EMAIL);
        email.setValue(response.email());

        // Teléfono
        ContactPoint phone = patient.addTelecom();
        phone.setSystem(ContactPoint.ContactPointSystem.PHONE);
        phone.setValue(response.telefono());

        Identifier dni = patient.addIdentifier();
        dni.setSystem("http://example.org/dni");
        dni.setValue(response.dni());
        dni.setUse(Identifier.IdentifierUse.OFFICIAL);

        Identifier insurance = patient.addIdentifier();
        insurance.setSystem("http://example.org/obra-social");
        insurance.setValue(response.numeroAfiliado());
        insurance.setUse(Identifier.IdentifierUse.SECONDARY);

        // Dirección
        Address address = patient.addAddress();
        address.addLine(response.direccion());

        // Género
        patient.setGender(switch (response.genero().toLowerCase()) {
            case "masculino" -> Enumerations.AdministrativeGender.MALE;
            case "femenino" -> Enumerations.AdministrativeGender.FEMALE;
            case "otro" -> Enumerations.AdministrativeGender.OTHER;
            default -> Enumerations.AdministrativeGender.UNKNOWN;
        });

        // Fecha de nacimiento
        patient.setBirthDate(java.sql.Date.valueOf(response.fechaNacimiento()));

        fhirService.createPatient(patient);
        System.out.println("Se guardo el paciente");

    }

}
