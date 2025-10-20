package com.example.billing.features.billing.dto;

import com.example.billing.features.billing.model.Billing;
import com.example.billing.features.billing.model.BillingStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record BillingResponseDTO(
        Long id,
        BigDecimal totalAmount,
        BillingStatus status,
        OffsetDateTime createdAt,
        OffsetDateTime paidAt,
        String paymentMethod,
        String notes,
        boolean enabled
) {
    public BillingResponseDTO(Billing billing) {
        this(
                billing.getId(),
                billing.getTotalAmount(),
                billing.getStatus(),
                billing.getCreatedAt(),
                billing.getPaidAt(),
                billing.getPaymentMethod(),
                billing.getNotes(),
                billing.isEnabled()
        );
    }
}
