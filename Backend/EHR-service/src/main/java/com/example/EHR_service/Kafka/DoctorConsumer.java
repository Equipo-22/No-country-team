package com.example.EHR_service.Kafka;

import com.example.EHR_service.Models.Dtos.practioner.DoctorResponseDTO;
import com.example.EHR_service.Services.FhirService;
import com.example.EHR_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.*;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DoctorConsumer {

    private final FhirService fhirService;

    @KafkaListener(topics = "doctor_register-topic",groupId = "ehr-group")
    public void handleDoctorSaved(String message){
        DoctorResponseDTO doctorRegisterEvent= Jsonutils.fromJson(message, DoctorResponseDTO.class);
        Practitioner practitioner=new Practitioner();

        practitioner.setId(doctorRegisterEvent.id().toString());

        practitioner.addName(new HumanName().addGiven(doctorRegisterEvent.firstName())
                .setFamily(doctorRegisterEvent.lastName()));

        practitioner.addIdentifier(new Identifier().setSystem("LicenseNumber")
                        .setValue(doctorRegisterEvent.licenseNumber()));

        practitioner.addQualification(new Practitioner.PractitionerQualificationComponent()
                .setCode(new CodeableConcept().setText(doctorRegisterEvent.specialty())));

        practitioner.setGender(Enumerations.AdministrativeGender.fromCode(doctorRegisterEvent.gender().toLowerCase()));

        Date date=Date.from(doctorRegisterEvent.birthDate().atStartOfDay(ZoneId.systemDefault()).toInstant());
        practitioner.setBirthDate(date);

        practitioner.addTelecom(new ContactPoint()
                .setSystem(ContactPoint.ContactPointSystem.EMAIL)
                .setValue(doctorRegisterEvent.email()));

        practitioner.addTelecom(new ContactPoint()
                .setSystem(ContactPoint.ContactPointSystem.PHONE)
                .setValue(doctorRegisterEvent.phone()));

        fhirService.createPractitioner(practitioner);
        System.out.println("Se guardo el medico");
    }
}
