package com.example.appointment_service.Mappers;

import com.example.appointment_service.Models.Dtos.AppointmentResponse;
import com.example.appointment_service.Models.Entities.Appointment;

public class AppointmentMapper {

    public static AppointmentResponse toResponse(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getPatientId(),
                appointment.getProfessionalId(),
                appointment.getMeetingUrl(),
                appointment.getStartTime(),
                appointment.getEndTime(),
                appointment.getType(),
                appointment.getMotivo(),
                appointment.getLugar(),
                appointment.getStatus(),
                appointment.getCreatedAt()
        );
    }
}
