package com.example.billing.features.billing.repository;

import com.example.billing.features.billing.model.Billing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IBillingRepository extends JpaRepository<Billing, Long> {
    @Query("""
            SELECT b
            FROM Billing b
            WHERE b.id = :id
            AND b.enabled = true
            """)
    Optional<Billing> findById(Long id);

    @Query("""
            SELECT b
            FROM Billing b
            WHERE b.enabled = true
            """)
    Page<Billing> findAll(Pageable pagination);
}
