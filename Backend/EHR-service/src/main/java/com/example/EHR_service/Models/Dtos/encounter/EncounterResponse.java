package com.example.EHR_service.Models.Dtos.encounter;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EncounterResponse {
    private String id;
    private String patientId;
    private String status;
    private String encounterClass;
    private String practitionerId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String reason;
    private String location;
}
