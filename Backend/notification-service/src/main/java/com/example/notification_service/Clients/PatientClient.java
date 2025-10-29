package com.example.notification_service.Clients;

import com.example.notification_service.Models.Dtos.PatientResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "patient-service", url = "http://api-gateway:8080/patient")
public interface PatientClient {
    @GetMapping("/{id}")
    PatientResponse getPatient(@PathVariable UUID id);
}
