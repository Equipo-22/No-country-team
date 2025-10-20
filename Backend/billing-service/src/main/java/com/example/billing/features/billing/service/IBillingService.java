package com.example.billing.features.billing.service;

import com.example.billing.features.billing.dto.BillingRegisterDTO;
import com.example.billing.features.billing.dto.BillingResponseDTO;
import com.example.billing.features.billing.dto.BillingUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IBillingService {
    BillingResponseDTO create(BillingRegisterDTO billingRegisterDTO);

    void deleteById(Long id);

    Page<BillingResponseDTO> findAll(Pageable pagination);

    BillingResponseDTO findById(Long id);

    BillingResponseDTO update(Long id, BillingUpdateDTO billingUpdateDTO);
}
