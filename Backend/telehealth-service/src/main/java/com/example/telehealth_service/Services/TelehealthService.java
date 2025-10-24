package com.example.telehealth_service.Services;

import com.example.telehealth_service.Clients.DoctorClient;
import com.example.telehealth_service.Clients.PatientClient;
import com.example.telehealth_service.Models.Dtos.DoctorResponseDTO;
import com.example.telehealth_service.Models.Dtos.PatientResponse;
import com.example.telehealth_service.Models.Dtos.TelehealthRequest;
import com.example.telehealth_service.Models.Entities.TelehealthSession;
import com.example.telehealth_service.Models.Enums.SessionStatus;
import com.example.telehealth_service.Repositories.TelehealthRepository;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TelehealthService {

    private final Calendar calendar;
    private final TelehealthRepository sessionRepository;
    private final DoctorClient doctorClient;
    private final PatientClient patientClient;

    public TelehealthSession createSession(TelehealthRequest request) throws IOException {
        // Convertir LocalDateTime a Date
        ZoneId zone = ZoneId.of("America/Argentina/Buenos_Aires");
        Date inicio = Date.from(request.startTime().atZone(zone).toInstant());
        Date fin = Date.from(request.endTime().atZone(zone).toInstant());

        DoctorResponseDTO doctorResponseDTO =doctorClient.findById(request.professionalId());
        //hacer lo mismo con paciente.
        PatientResponse patientResponse =patientClient.getPatient(request.patientId());
        
        // Crear evento con asistentes
        Event event = new Event()
                .setSummary("Consulta médica")
                .setDescription("Consulta médica")
                .setAttendees(Arrays.asList(
                        new EventAttendee().setEmail(patientResponse.email()), // reemplazar con request.patientId/email
                        new EventAttendee().setEmail(doctorResponseDTO.email())    // reemplazar con request.professionalId/email
                ));

        // Fecha de inicio y fin
        event.setStart(new EventDateTime()
                .setDateTime(new DateTime(inicio))
                .setTimeZone("America/Argentina/Buenos_Aires"));
        event.setEnd(new EventDateTime()
                .setDateTime(new DateTime(fin))
                .setTimeZone("America/Argentina/Buenos_Aires"));

        // Crear link de Google Meet real
        ConferenceData conferenceData = new ConferenceData()
                .setCreateRequest(new CreateConferenceRequest()
                        .setRequestId(UUID.randomUUID().toString()));
        event.setConferenceData(conferenceData);

        // Insertar evento en Calendar con DWD
        Event createdEvent = calendar.events()
                .insert("primary", event)
                .setConferenceDataVersion(1)
                .setSendUpdates("all") // envía invitaciones automáticamente
                .execute();

        // Obtener enlace de Meet
        String meetLink = createdEvent.getConferenceData().getEntryPoints().get(0).getUri();

        // Guardar sesión en DB
        TelehealthSession session = new TelehealthSession();
        session.setAppointmentId(request.appointmentId());
        session.setPatientId(request.patientId());
        session.setProfessionalId(request.professionalId());
        session.setStartTime(request.startTime());
        session.setEndTime(request.endTime());
        session.setMeetingUrl(meetLink);
        session.setStatus(SessionStatus.PENDING);
        session.setCreatedAt(LocalDateTime.now());

        return sessionRepository.save(session);
    }
}
