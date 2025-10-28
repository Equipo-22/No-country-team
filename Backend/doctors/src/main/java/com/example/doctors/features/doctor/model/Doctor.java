package com.example.doctors.features.doctor.model;

import com.example.doctors.features.doctor.dto.DoctorRegisterDTO;
import com.example.doctors.features.doctor.dto.DoctorUpdateDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@Getter
@AllArgsConstructor
@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // 👈 nuevo
    private UUID id;

    @Column(nullable = false, unique = true)
    private UUID userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String licenseNumber; // Número de colegiatura/licencia médica

    @Column(nullable = false)
    private String specialty;

    private String gender;

    private LocalDate birthDate;

    @Column(nullable = false)
    private String email;

    private String phone;

    // Guarda la fecha de creación en UTC
    @CreationTimestamp
    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE", updatable = false)
    private OffsetDateTime createdAt;

    private boolean enabled = true;

    public Doctor() {
    }

    public Doctor(DoctorRegisterDTO doctorRegisterDTO) {
        this.userId = doctorRegisterDTO.userId();
        this.name = doctorRegisterDTO.name();
        this.licenseNumber = doctorRegisterDTO.licenseNumber();
        this.specialty = doctorRegisterDTO.specialty();
        this.gender = doctorRegisterDTO.gender();
        this.birthDate = doctorRegisterDTO.birthDate();
        this.email = doctorRegisterDTO.email();
        this.phone = doctorRegisterDTO.phone();
    }

    public void deactive() {
        this.enabled = false;
    }

    public void setName(String name) {
        this.name = name;
    }


    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void update(DoctorUpdateDTO dto) {
        Optional.ofNullable(dto.name()).ifPresent(v -> this.name = v);
        Optional.ofNullable(dto.licenseNumber()).ifPresent(v -> this.licenseNumber = v);
        Optional.ofNullable(dto.specialty()).ifPresent(v -> this.specialty = v);
        Optional.ofNullable(dto.gender()).ifPresent(v -> this.gender = v);
        Optional.ofNullable(dto.birthDate()).ifPresent(v -> this.birthDate = v);
        Optional.ofNullable(dto.email()).ifPresent(v -> this.email = v);
        Optional.ofNullable(dto.phone()).ifPresent(v -> this.phone = v);
        Optional.ofNullable(dto.enabled()).ifPresent(v -> this.enabled = v);
    }
}
