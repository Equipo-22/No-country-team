package com.example.doctors.features.doctor.service;

import com.example.doctors.features.doctor.dto.DoctorRegisterDTO;
import com.example.doctors.features.doctor.dto.DoctorResponseDTO;
import com.example.doctors.features.doctor.dto.DoctorUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IDoctorService {
    DoctorResponseDTO create(DoctorRegisterDTO doctorRegisterDTO);

    void deleteById(UUID id);

    Page<DoctorResponseDTO> findAll(Pageable pagination);

    DoctorResponseDTO findById(UUID id);

    DoctorResponseDTO update(UUID id, DoctorUpdateDTO doctorUpdateDTO);
}
