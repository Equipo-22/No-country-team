package com.example.EHR_service.Kafka;

import com.example.EHR_service.Models.Dtos.appointment.AppointmentResponse;
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
public class AppointmentConsumer {
    private final FhirService fhirService;

    @KafkaListener(topics = "appointment-register-topic",groupId = "ehr-group")
    public void  handleAppointmentRegister(String message) {
        AppointmentResponse dto= Jsonutils.fromJson(message, AppointmentResponse.class);
        Encounter encounter=new Encounter();

        encounter.setId(dto.id().toString());
        System.out.println(encounter.getId());
        // 2. Status
        switch (dto.status()) {
            case PENDING -> encounter.setStatus(Encounter.EncounterStatus.PLANNED);
            case COMPLETED -> encounter.setStatus(Encounter.EncounterStatus.FINISHED);
            case CANCELLED -> encounter.setStatus(Encounter.EncounterStatus.CANCELLED);
        }

        Coding encounterClassCoding = switch (dto.type()) {
            case PRESENCIAL -> new Coding()
                    .setSystem("http://terminology.hl7.org/CodeSystem/v3-ActCode")
                    .setCode("AMB")
                    .setDisplay("Ambulatory");
            case VIRTUAL -> new Coding()
                    .setSystem("http://terminology.hl7.org/CodeSystem/v3-ActCode")
                    .setCode("VR")
                    .setDisplay("Virtual");
        };
        encounter.setClass_(encounterClassCoding);

        // 4. Referencia al paciente
        encounter.setSubject(new Reference("Patient/" + dto.patientId()));

        // 5. Participante (practitioner)
        Encounter.EncounterParticipantComponent participant = new Encounter.EncounterParticipantComponent();
        participant.setIndividual(new Reference("Practitioner/" + dto.professionalId()));
        encounter.addParticipant(participant);

        // 6. Periodo de inicio y fin
        Date startDate = Date.from(dto.startTime().atZone(ZoneId.of("America/Argentina/Buenos_Aires")).toInstant());
        Date endDate = Date.from(dto.endTime().atZone(ZoneId.of("America/Argentina/Buenos_Aires")).toInstant());
        encounter.setPeriod(new Period().setStart(startDate).setEnd(endDate));

        fhirService.createEncounter(encounter);
        System.out.println("Encounter created");
    }
}
