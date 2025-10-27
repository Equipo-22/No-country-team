package com.example.appointment_service.Repositories;

import com.example.appointment_service.Models.Entities.Appointment;
import com.example.appointment_service.Models.Enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findAllByStatusAndEndTimeBefore(AppointmentStatus status, LocalDateTime now);

}
