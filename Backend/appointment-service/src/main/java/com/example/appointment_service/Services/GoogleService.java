package com.example.appointment_service.Services;

import com.example.appointment_service.Clients.DoctorClient;
import com.example.appointment_service.Clients.PatientClient;
import com.example.appointment_service.Models.Dtos.DoctorResponseDTO;
import com.example.appointment_service.Models.Dtos.PatientResponse;
import com.example.appointment_service.Models.Dtos.AppointmentRequest;
import com.example.appointment_service.Models.Entities.Appointment;
import com.example.appointment_service.Models.Enums.AppointmentStatus;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GoogleService {

    private final Calendar calendar;
    private final DoctorClient doctorClient;
    private final PatientClient patientClient;

    public void createEventCalendar(Appointment  appointment) throws IOException {
        ZoneId zone = ZoneId.of("America/Argentina/Buenos_Aires");
        Date inicio = Date.from(appointment.getStartTime().atZone(zone).toInstant());
        Date fin = Date.from(appointment.getEndTime().atZone(zone).toInstant());

        DoctorResponseDTO doctorResponseDTO =doctorClient.findById(appointment.getProfessionalId());
        PatientResponse patientResponse =patientClient.getPatient(appointment.getPatientId());

        Event event = new Event()
                .setSummary("Consulta médica")
                .setDescription("Consulta médica")
                .setLocation("Av. Santa Fe 1234, Buenos Aires")
                .setAttendees(Arrays.asList(
                        new EventAttendee().setEmail(patientResponse.email()),
                        new EventAttendee().setEmail(doctorResponseDTO.email())
                ));

        // Fecha de inicio y fin
        event.setStart(new EventDateTime()
                .setDateTime(new DateTime(inicio))
                .setTimeZone("America/Argentina/Buenos_Aires"));
        event.setEnd(new EventDateTime()
                .setDateTime(new DateTime(fin))
                .setTimeZone("America/Argentina/Buenos_Aires"));

        //Envia recordatorio por mail y por calendar
        event.setReminders(new Event.Reminders()
                .setUseDefault(false)
                .setOverrides(Arrays.asList(
                        new EventReminder().setMethod("email").setMinutes(60),
                        new EventReminder().setMethod("popup").setMinutes(10)
                )));

        Event createdEvent = calendar.events()
                .insert("primary", event)
                .setSendUpdates("all") // envía automáticamente la invitación a los asistentes
                .execute();
    }

    //setea meet link y tambien el event id
    public void createMeetLink(Appointment appointment) throws IOException {
        // Convertir LocalDateTime a Date
        ZoneId zone = ZoneId.of("America/Argentina/Buenos_Aires");
        Date inicio = Date.from(appointment.getStartTime().atZone(zone).toInstant());
        Date fin = Date.from(appointment.getEndTime().atZone(zone).toInstant());

        DoctorResponseDTO doctorResponseDTO =doctorClient.findById(appointment.getProfessionalId());
        PatientResponse patientResponse =patientClient.getPatient(appointment.getPatientId());
        
        Event event = new Event()
                .setSummary("Consulta médica")
                .setDescription("Consulta médica")
                .setAttendees(Arrays.asList(
                        new EventAttendee().setEmail(patientResponse.email()),
                        new EventAttendee().setEmail(doctorResponseDTO.email())
                ));

        // Fecha de inicio y fin
        event.setStart(new EventDateTime()
                .setDateTime(new DateTime(inicio))
                .setTimeZone("America/Argentina/Buenos_Aires"));
        event.setEnd(new EventDateTime()
                .setDateTime(new DateTime(fin))
                .setTimeZone("America/Argentina/Buenos_Aires"));

        //Envia recordatorio por mail y por calendar
        event.setReminders(new Event.Reminders()
                .setUseDefault(false)
                .setOverrides(Arrays.asList(
                        new EventReminder().setMethod("email").setMinutes(60),
                        new EventReminder().setMethod("popup").setMinutes(10)
                )));

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
         String meetLink=createdEvent.getConferenceData().getEntryPoints().get(0).getUri();
         String eventId=createdEvent.getId();

        appointment.setMeetingUrl(meetLink);
        appointment.setEventId(eventId);
    }

    public void cancelMeet(String event_id) throws IOException {
        if (event_id != null) {
            calendar.events().delete("primary", event_id).execute();
        }
    }

}
