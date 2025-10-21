package com.example.EHR_service.Models.Dtos.observation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ObservationRequest {
    @NotNull
    private String pacienteId;

    @NotBlank
    private String descripcion; // ejemplo: "Fotofobia"

    private String valor; // ejemplo: "Se incomoda con luz intensa"

    private LocalDateTime fecha; // fecha de la observación

    private String encounterId;
}
