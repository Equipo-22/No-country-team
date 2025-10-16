package com.example.EHR_service.Models.Dtos.medication;

import lombok.*;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicationResponse {
    private String id;

    private String name;
    private String form;
    private String manufacturer;
    private String lotNumber;
    private LocalDate expirationDate;
    private String ingredient;
}
