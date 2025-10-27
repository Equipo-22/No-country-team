package com.example.appointment_service.Clients;

import com.example.appointment_service.Models.Dtos.DoctorResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "doctor-service", url = "http://api-gateway:8080/doctor")
public interface DoctorClient {

    @GetMapping("/{id}")
    DoctorResponseDTO findById(@PathVariable UUID id);
}
