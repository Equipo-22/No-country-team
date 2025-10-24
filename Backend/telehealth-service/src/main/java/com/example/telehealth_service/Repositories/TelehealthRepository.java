package com.example.telehealth_service.Repositories;

import com.example.telehealth_service.Models.Entities.TelehealthSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TelehealthRepository extends JpaRepository<TelehealthSession, UUID> {
}
