package com.example.billing.features.billing.model;

import com.example.billing.features.billing.dto.BillingRegisterDTO;
import com.example.billing.features.billing.dto.BillingUpdateDTO;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Optional;

@Entity
@Table(name = "billings")
public class Billing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // relacion con la cita medica
    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;
     */

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    // Estado del pago (ej. PENDING, PAID, CANCELLED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BillingStatus status = BillingStatus.PENDING;

    @CreationTimestamp
    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE", updatable = false)
    private OffsetDateTime createdAt;

    // fecha de pago (si se completó)
    private OffsetDateTime paidAt;

    // Metodo de pago (ej. efectivo, tarjeta, seguro)
    private String paymentMethod;

    // Observaciones o notas del cobro
    private String notes;

    private boolean enabled = true;

    public Billing() {
    }

    public Billing(BillingRegisterDTO dto) {
        this.totalAmount = dto.totalAmount();
        Optional.ofNullable(dto.status()).ifPresent(v -> this.status = v);
        this.paidAt = dto.paidAt();
        this.paymentMethod = dto.paymentMethod();
        this.notes = dto.notes();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BillingStatus getStatus() {
        return status;
    }

    public void setStatus(BillingStatus status) {
        this.status = status;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(OffsetDateTime paidAt) {
        this.paidAt = paidAt;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void deactive() {
        this.enabled = false;
    }

    public void update(BillingUpdateDTO billingUpdateDTO) {
        Optional.ofNullable(billingUpdateDTO.totalAmount()).ifPresent(v -> this.totalAmount = v);
        Optional.ofNullable(billingUpdateDTO.status()).ifPresent(v -> this.status = v);
        Optional.ofNullable(billingUpdateDTO.paidAt()).ifPresent(v -> this.paidAt = v);
        Optional.ofNullable(billingUpdateDTO.paymentMethod()).ifPresent(v -> this.paymentMethod = v);
        Optional.ofNullable(billingUpdateDTO.notes()).ifPresent(v -> this.notes = v);
        Optional.ofNullable(billingUpdateDTO.enabled()).ifPresent(v -> this.enabled = v);
    }
}
