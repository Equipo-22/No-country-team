package com.example.patient_service.Controllers;

import com.example.patient_service.Models.Dtos.PatientRequest;
import com.example.patient_service.Models.Dtos.PatientResponse;
import com.example.patient_service.Models.Dtos.PatientUpdateRequest;
import com.example.patient_service.Services.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PatientResponse getPatient(@PathVariable("id") UUID patient_id){
        return patientService.findById(patient_id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponse createPatient(@Valid @RequestBody PatientRequest patientRequest){
        return patientService.createPatient(patientRequest);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PatientResponse updatePatient(@PathVariable("id")UUID id, @RequestBody PatientUpdateRequest request){
        return patientService.updatePatient(id,request);
    }
}
