package com.example.EHR_service.Clients;

import com.example.EHR_service.Models.Dtos.appointment.AppointmentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "appointment-service", url = "http://api-gateway:8080/appointment")
public interface AppointmentClient {
    @GetMapping("/{id}")
    AppointmentResponse getAppointmentById(@PathVariable UUID id);
}
