package com.example.doctors.features.doctor.service;

import com.example.doctors.features.doctor.dto.DoctorRegisterDTO;
import com.example.doctors.features.doctor.dto.DoctorResponseDTO;
import com.example.doctors.features.doctor.dto.DoctorUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IDoctorService {
    DoctorResponseDTO create(DoctorRegisterDTO doctorRegisterDTO);

    void deleteById(Long id);

    Page<DoctorResponseDTO> findAll(Pageable pagination);

    DoctorResponseDTO findById(Long id);

    DoctorResponseDTO update(Long id, DoctorUpdateDTO doctorUpdateDTO);
}
