package com.example.EHR_service.Models.Dtos.practioner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PractitionerResponse {
    private String id;

    // --- DATOS PERSONALES ---
    private String firstName;
    private String lastName;
    private String gender;

    // --- IDENTIFICADORES ---
    private String licenseNumber;
    private String hospitalId;

    // --- CONTACTO ---
    private String phone;
    private String email;
    private String address;

    // --- PROFESIÓN / ESPECIALIDAD ---
    private String qualification;
}
