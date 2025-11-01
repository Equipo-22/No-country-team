package com.example.doctors.features.doctor.service;

import com.example.doctors.config.exceptions.NotFoundException;
import com.example.doctors.features.doctor.dto.DoctorRegisterDTO;
import com.example.doctors.features.doctor.dto.DoctorResponseDTO;
import com.example.doctors.features.doctor.dto.DoctorUpdateDTO;
import com.example.doctors.features.doctor.model.Doctor;
import com.example.doctors.features.doctor.repository.IDoctorRepository;
import com.example.doctors.kafka.DoctorProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DoctorService implements IDoctorService {

    private final IDoctorRepository doctorRepository;
    private final DoctorProducer doctorProducer;

    @Override
    public DoctorResponseDTO create(DoctorRegisterDTO doctorRegisterDTO) {
        DoctorResponseDTO doctor= new DoctorResponseDTO(doctorRepository.save(new Doctor(doctorRegisterDTO)));
        doctorProducer.sendDoctorRegisterEvent(doctor);
        return doctor;
    }

    @Override
    public void deleteById(UUID id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Doctor no encontrado"));
        doctor.deactive();
    }

    @Override
    public Page<DoctorResponseDTO> findAll(Pageable pagination) {
        return doctorRepository.findAll(pagination).map(DoctorResponseDTO::new);
    }

    @Override
    public DoctorResponseDTO findById(UUID id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(("Doctor no encontrado")));
        return new DoctorResponseDTO(doctor);
    }

    @Override
    public DoctorResponseDTO update(UUID id, DoctorUpdateDTO doctorUpdateDTO) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Doctor no encontrado"));
        doctor.update(doctorUpdateDTO);
        return new DoctorResponseDTO(doctor);
    }
}
