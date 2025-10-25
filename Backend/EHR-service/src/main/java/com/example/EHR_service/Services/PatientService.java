package com.example.EHR_service.Services;

import com.example.EHR_service.Mappers.patient.PatientMapper;
import com.example.EHR_service.Mappers.patientHistory.PatientHistoryMapper;
import com.example.EHR_service.Models.Dtos.patient.PatientResponseFhir;
import com.example.EHR_service.Models.Dtos.patientHistory.PatientHistoryResponse;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final FhirService fhirService;

    //agregar metodo que escuche evento y guarde a nuevo paciente.

    public PatientResponseFhir getPatient(String id) {
        Patient patient=fhirService.getPatient(id);
        return PatientMapper.toDto(patient);
    }

    public PatientHistoryResponse getPatientHistory(String patientId,int page,int size) {
        Bundle bundle = fhirService.getPatientEncountersWithRelatedResources(patientId,page,size);
        return PatientHistoryMapper.toDto(bundle,page,size);
    }


}
