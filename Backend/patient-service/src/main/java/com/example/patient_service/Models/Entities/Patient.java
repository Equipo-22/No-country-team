package com.example.patient_service.Models.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    //UUID del usuario del auth-service
    @Column(nullable = false, unique = true)
    private UUID userId;

    @Column(nullable = false)
    private String email;
    private String nombre;
    private String apellido;
    private String dni;
    private String genero;
    private LocalDate fechaNacimiento;
    private String cobertura;
    private String telefono;
    private String direccion;
    private String obraSocial;
    private String numeroAfiliado;
}
