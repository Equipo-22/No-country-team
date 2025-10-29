package com.example.patient_service.Controllers;

import com.example.patient_service.Models.Dtos.PatientRequest;
import com.example.patient_service.Models.Dtos.PatientResponse;
import com.example.patient_service.Models.Dtos.PatientUpdateRequest;
import com.example.patient_service.Services.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;

    @Operation(
            summary = "Obtener paciente.",
            description = "Busca y obtiene un paciente por su ID."
    )
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PatientResponse getPatient(@PathVariable("id") UUID patient_id){
        return patientService.findById(patient_id);
    }

    @Operation(
            summary = "Crear paciente.",
            description = "Crea un nuevo paciente."
    )
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponse createPatient(@Valid @RequestBody PatientRequest patientRequest){
        return patientService.createPatient(patientRequest);
    }

    @Operation(
            summary = "Actualizar paciente.",
            description = "Actualiza la informacion de un paciente."
    )
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PatientResponse updatePatient(@PathVariable("id")UUID id, @RequestBody PatientUpdateRequest request){
        return patientService.updatePatient(id,request);
    }

    @Operation(
            summary = "Obtener paciente por userId.",
            description = "Obtiene un paciente por su userId."
    )
    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public PatientResponse getPatientByUserId(@PathVariable("userId") UUID user_id){
        return patientService.findByUserId(user_id);
    }
}
