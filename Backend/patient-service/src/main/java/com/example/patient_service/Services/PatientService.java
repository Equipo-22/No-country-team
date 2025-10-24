package com.example.patient_service.Services;

import com.example.patient_service.Kafka.PatientProducer;
import com.example.patient_service.Mappers.PatientMapper;
import com.example.patient_service.Models.Dtos.PatientRequest;
import com.example.patient_service.Models.Dtos.PatientResponse;
import com.example.patient_service.Models.Dtos.PatientUpdateRequest;
import com.example.patient_service.Models.Entities.Patient;
import com.example.patient_service.Repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final PatientProducer patientProducer;

    public PatientResponse findById(UUID patient_id) {
        Patient patient=patientRepository.findById(patient_id)
                .orElseThrow(()->new RuntimeException("Patient not found"));
        return PatientMapper.toResponse(patient);
    }

    public PatientResponse createPatient(PatientRequest patientRequest) {
        Patient patient = PatientMapper.toEntity(patientRequest);
        Patient patient_saved=patientRepository.save(patient);

        PatientResponse dto=PatientMapper.toResponse(patient_saved);
        patientProducer.sendPatientRegisterEvent(dto);
        return dto;
    }

    public PatientResponse updatePatient(UUID patient_id, PatientUpdateRequest request) {
        Patient patient=patientRepository.findById(patient_id)
                .orElseThrow(()->new RuntimeException("Patient not found"));

        PatientMapper.toEntity(patient, request);

        Patient updated = patientRepository.save(patient);

        return PatientMapper.toResponse(updated);

    }

}
