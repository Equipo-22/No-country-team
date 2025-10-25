package com.example.patient_service.Mappers;

import com.example.patient_service.Models.Dtos.PatientRequest;
import com.example.patient_service.Models.Dtos.PatientResponse;
import com.example.patient_service.Models.Dtos.PatientUpdateRequest;
import com.example.patient_service.Models.Entities.Patient;


public class PatientMapper {

    public static PatientResponse toResponse(Patient patient) {
        if (patient == null) {
            return null;
        }

        return new PatientResponse(
                patient.getId(),
                patient.getUserId(),
                patient.getNombre(),
                patient.getApellido(),
                patient.getEmail(),
                patient.getDni(),
                patient.getGenero(),
                patient.getFechaNacimiento(),
                patient.getCobertura(),
                patient.getTelefono(),
                patient.getDireccion(),
                patient.getObraSocial(),
                patient.getNumeroAfiliado()
        );
    }

    public static Patient toEntity(PatientRequest request) {
        if (request == null) {
            return null;
        }

        Patient patient = new Patient();
        patient.setUserId(request.userId());
        patient.setNombre(request.nombre());
        patient.setApellido(request.apellido());
        patient.setEmail(request.email());
        patient.setDni(request.dni());
        patient.setGenero(request.genero());
        patient.setFechaNacimiento(request.fechaNacimiento());
        patient.setCobertura(request.cobertura());
        patient.setTelefono(request.telefono());
        patient.setDireccion(request.direccion());
        patient.setObraSocial(request.obraSocial());
        patient.setNumeroAfiliado(request.numeroAfiliado());

        return patient;
    }
    public static void toEntity(Patient patient, PatientUpdateRequest request) {
        if (request == null) {
            return;
        }

        patient.setNombre(request.nombre());
        patient.setApellido(request.apellido());
        patient.setGenero(request.genero());
        patient.setFechaNacimiento(request.fechaNacimiento());
        patient.setCobertura(request.cobertura());
        patient.setTelefono(request.telefono());
        patient.setDireccion(request.direccion());
        patient.setObraSocial(request.obraSocial());
        patient.setNumeroAfiliado(request.numeroAfiliado());

    }

}
