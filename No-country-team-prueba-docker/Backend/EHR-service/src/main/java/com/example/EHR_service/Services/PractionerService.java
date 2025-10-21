package com.example.EHR_service.Services;

import com.example.EHR_service.Models.Dtos.practioner.PractitionerRequest;
import com.example.EHR_service.Models.Dtos.practioner.PractitionerResponse;
import com.example.EHR_service.Mappers.practitioner.PractitionerMapper;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.Practitioner;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PractionerService {
    private final FhirService fhirService;

    //agregar metodo para q escuche evento y guarde al nuevo medico
}
