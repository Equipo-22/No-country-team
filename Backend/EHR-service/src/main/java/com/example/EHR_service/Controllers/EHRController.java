package com.example.EHR_service.Controllers;

import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterRequest;
import com.example.EHR_service.Models.Dtos.fullEncounter.FullEncounterResponse;
import com.example.EHR_service.Models.Dtos.patientHistory.PatientHistoryResponse;
import com.example.EHR_service.Services.FullEncounterService;
import com.example.EHR_service.Services.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "bearer-key")
@PreAuthorize("hasRole('PERSONAL_MEDICO')")
@Tag(name = "EHR Service", description = "Endpoints de historial clinico (usar prefijo /ehr/ para otros entornos y ingresar jwt con ROLE_PERSONAL_MEDICO)")
public class EHRController {

    private final PatientService patientService;
    private final FullEncounterService fullEncounterService;

    @Operation(
            summary = "Obtener historial clinico de un paciente.",
            description = "Devuelve los datos del Paciente y Encounters, junto con las condiciones, observaciones y prescripciones asociadas al encounter."
    )
    @GetMapping("/patient/{id}/history")
    @ResponseStatus(HttpStatus.OK)
    public PatientHistoryResponse getPatientHistory(@PathVariable String id,
                                                    @RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size){
        return patientService.getPatientHistory(id,page,size);
    }

    @Operation(
            summary = "Crear registro clinico.",
            description = "Guarda un nuevo encounter(cita), junto con las condiciones, observaciones y prescripciones asociadas al mismo.(las observaciones, condiciones y prescripciones no son obligatorias)"
    )
    @PostMapping("/patient/history")
    @ResponseStatus(HttpStatus.OK)
    public FullEncounterResponse createHistory(@RequestBody @Valid FullEncounterRequest fullEncounterRequest){
        return fullEncounterService.createFullEncounter(fullEncounterRequest);
    }

    @Operation(
            summary = "Obtener datos completos de una consulta.",
            description = "Devuelve los datos del Encounter, junto con las condiciones, observaciones y prescripciones asociadas al encounter especificado."
    )
    @GetMapping("/history/{encounterId}")
    @ResponseStatus(HttpStatus.OK)
    public FullEncounterResponse getEncounter(@PathVariable("encounterId") String encounter_id){
        return fullEncounterService.getFullEncounter(encounter_id);
    }
}
