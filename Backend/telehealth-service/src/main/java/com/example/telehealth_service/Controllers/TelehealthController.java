package com.example.telehealth_service.Controllers;

import com.example.telehealth_service.Clients.DoctorClient;
import com.example.telehealth_service.Clients.PatientClient;
import com.example.telehealth_service.Models.Dtos.DoctorResponseDTO;
import com.example.telehealth_service.Models.Dtos.PatientResponse;
import com.example.telehealth_service.Models.Dtos.TelehealthRequest;
import com.example.telehealth_service.Models.Entities.TelehealthSession;
import com.example.telehealth_service.Services.TelehealthService;
import com.google.api.services.calendar.model.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class TelehealthController {

    private final TelehealthService telehealthService;
    private final DoctorClient doctorClient;
    private final PatientClient patientClient;
    @PostMapping("/test")
    public TelehealthSession crearCita(@RequestBody TelehealthRequest request) throws IOException {
        return telehealthService.createSession(request);
    }
    @GetMapping("/test2/{id}")
    public DoctorResponseDTO findById2(@PathVariable UUID id) throws IOException {
        return doctorClient.findById(id);
    }
    @GetMapping("/test3/{id}")
    public PatientResponse findById3(@PathVariable UUID id) throws IOException {
        return patientClient.getPatient(id);
    }

}
