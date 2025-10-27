package com.example.appointment_service.Controllers;

import com.example.appointment_service.Models.Dtos.AppointmentRequest;
import com.example.appointment_service.Models.Dtos.AppointmentResponse;
import com.example.appointment_service.Services.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Operation(
            summary = "Obtener cita.",
            description = "Busca y obtiene una cita por su ID."
    )
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppointmentResponse getAppointmentById(@PathVariable UUID id) {
        return appointmentService.findById(id);
    }

    @Operation(
            summary = "Crear cita.",
            description = "Crea una nueva cita.(puedo ser: PRESENCIAL o VIRTUAL)"
    )
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentResponse createAppointment(@RequestBody AppointmentRequest appointmentRequest) throws IOException {
        return appointmentService.createAppointment(appointmentRequest);
    }

    @Operation(
            summary = "Cancelar cita.",
            description = "Cancela un cita por su ID."
    )
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void canceledAppointment(@PathVariable UUID id) throws IOException {
        appointmentService.cancelAppointment(id);
    }


}
