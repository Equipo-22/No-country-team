package com.example.EHR_service.Models.Dtos.medication;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class MedicationRequest {
    @NotBlank
    private String name; // nombre del medicamento

    private String form; // tableta, jarabe, cápsula, etc.

    private String manufacturer;

    private String lotNumber;

    private LocalDate expirationDate;

    private String ingredient; // opcional, ingrediente principal
}
