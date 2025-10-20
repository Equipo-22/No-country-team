package com.example.billing.features.billing.service;

import com.example.billing.config.exceptions.NotFoundException;
import com.example.billing.features.billing.dto.BillingRegisterDTO;
import com.example.billing.features.billing.dto.BillingResponseDTO;
import com.example.billing.features.billing.dto.BillingUpdateDTO;
import com.example.billing.features.billing.model.Billing;
import com.example.billing.features.billing.repository.IBillingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BillingService implements IBillingService {

    private final IBillingRepository billingRepository;

    public BillingService(IBillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    @Override
    public BillingResponseDTO create(BillingRegisterDTO billingRegisterDTO) {
        return new BillingResponseDTO(billingRepository.save(new Billing(billingRegisterDTO)));
    }

    @Override
    public void deleteById(Long id) {
        Billing billingDb = billingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Factura no encontrada"));
        billingDb.deactive();
    }

    @Override
    public Page<BillingResponseDTO> findAll(Pageable pagination) {
        return billingRepository.findAll(pagination).map(BillingResponseDTO::new);
    }

    @Override
    public BillingResponseDTO findById(Long id) {
        Billing billingDb = billingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Factura no encontrada"));
        return new BillingResponseDTO(billingDb);
    }

    @Override
    public BillingResponseDTO update(Long id, BillingUpdateDTO billingUpdateDTO) {
        Billing billingDb = billingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Factura no encontrada"));
        billingDb.update(billingUpdateDTO);
        return new BillingResponseDTO(billingDb);
    }
}
