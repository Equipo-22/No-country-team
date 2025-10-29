package com.example.notification_service.Kafka;

import com.example.notification_service.Clients.DoctorClient;
import com.example.notification_service.Clients.PatientClient;
import com.example.notification_service.Models.Dtos.AppointmentResponse;
import com.example.notification_service.Models.Dtos.DoctorResponseDTO;
import com.example.notification_service.Models.Dtos.PatientResponse;
import com.example.notification_service.Models.Entities.Notification;
import com.example.notification_service.Models.Enums.CancelledBy;
import com.example.notification_service.Models.Enums.NotificationType;
import com.example.notification_service.Repositories.NotificationRepository;
import com.example.notification_service.Services.NotificationService;
import com.example.notification_service.Utils.Jsonutils;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentCancelledConsumer {

    private final NotificationService notificationService;
    private final DoctorClient doctorClient;
    private final PatientClient patientClient;

    @KafkaListener(topics = "appointment-cancelled-topic",groupId = "notification-group")
    public void handleAppointementCancelled(String message) {
        AppointmentResponse appointment= Jsonutils.fromJson(message,AppointmentResponse.class);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        String fecha = appointment.startTime().toLocalDate().format(dateFormatter);
        String hora = appointment.startTime().toLocalTime().format(timeFormatter);

        DoctorResponseDTO doctor=doctorClient.findById(appointment.professionalId());
        PatientResponse patient=patientClient.getPatient(appointment.patientId());

        String descPaciente = (appointment.cancelledBy().equals(CancelledBy.PATIENT))
                ? String.format("Has cancelado tu consulta con el doctor %s programada para el %s a las %s. Podés agendar una nueva cita desde 'Mis citas' o elegir otro profesional.",
                doctor.name(), fecha, hora)
                : String.format("El doctor %s canceló la consulta programada para el %s a las %s. Podés agendar una nueva cita desde 'Mis citas' o elegir otro profesional.",
                doctor.name(), fecha, hora);

        String descDoctor = (appointment.cancelledBy().equals(CancelledBy.DOCTOR))
                ? String.format("Has cancelado tu consulta con el paciente %s programada para el %s a las %s.",
                patient.nombre(), fecha, hora)
                : String.format("El paciente %s canceló la consulta programada para el %s a las %s.",
                patient.nombre(), fecha, hora);

        notificationService.crearNotificacion(appointment.patientId(), "Tu cita ha sido cancelada.", descPaciente, NotificationType.ALERTA, appointment.id());
        notificationService.crearNotificacion(appointment.professionalId(), "Tu cita ha sido cancelada.", descDoctor, NotificationType.ALERTA, appointment.id());
    }

}
