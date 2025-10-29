package com.example.notification_service.Kafka;

import com.example.notification_service.Clients.DoctorClient;
import com.example.notification_service.Clients.PatientClient;
import com.example.notification_service.Models.Dtos.AppointmentResponse;
import com.example.notification_service.Models.Dtos.DoctorResponseDTO;
import com.example.notification_service.Models.Dtos.PatientResponse;
import com.example.notification_service.Models.Enums.NotificationType;
import com.example.notification_service.Services.NotificationService;
import com.example.notification_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class AppointmentReminderConsumer {

    private final PatientClient patientClient;
    private final DoctorClient doctorClient;
    private final NotificationService notificationService;

    @KafkaListener(topics = "appointment-reminder-topic", groupId = "notification-group")
    public void handleAppointmentReminder(String message){
        AppointmentResponse appointment= Jsonutils.fromJson(message, AppointmentResponse.class);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        String fecha = appointment.startTime().toLocalDate().format(dateFormatter);
        String hora = appointment.startTime().toLocalTime().format(timeFormatter);

        DoctorResponseDTO doctor = doctorClient.findById(appointment.professionalId());
        PatientResponse patient = patientClient.getPatient(appointment.patientId());

        // Notificación para paciente
        notificationService.crearNotificacion(
                appointment.patientId(),
                "Recordatorio de cita médica",
                String.format("Tenes una cita con el Dr. %s el %s a las %s.", doctor.name(), fecha, hora),
                NotificationType.RECORDATORIO,
                appointment.id()
        );

        // Notificación para doctor
        notificationService.crearNotificacion(
                appointment.professionalId(),
                "Recordatorio de cita médica",
                String.format("Tenes una cita con el paciente %s el %s a las %s.", patient.nombre(), fecha, hora),
                NotificationType.RECORDATORIO,
                appointment.id()
        );
    }

}
