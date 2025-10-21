package com.example.doctors.features.doctor.repository;

import com.example.doctors.features.doctor.model.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IDoctorRepository extends JpaRepository<Doctor, Long> {

    @Query("""
            SELECT d
            FROM Doctor d
            WHERE d.id = :id
            AND d.enabled = true
            """)
    Optional<Doctor> findById(Long id);

    @Query("""
            SELECT d
            FROM Doctor d
            WHERE d.enabled = true
            """)
    Page<Doctor> findAll(Pageable pagination);
}
