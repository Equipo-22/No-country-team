package com.example.EHR_service.Models.Dtos.observation;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ObservationResponse {

    private String id;

    private String pacienteId;

    private String descripcion; // ejemplo: "Fotofobia"

    private String valor; // ejemplo: "Se incomoda con luz intensa"

    private LocalDateTime fecha; // fecha de la observación

    private String encounterId;
}
