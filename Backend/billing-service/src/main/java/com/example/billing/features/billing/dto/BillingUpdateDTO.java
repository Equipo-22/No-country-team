package com.example.billing.features.billing.dto;

import com.example.billing.features.billing.model.BillingStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Schema(description = "Datos necesarios para editar una factura")
public record BillingUpdateDTO(
        @Schema(description = "Monto total", example = "250.00")
        @DecimalMin(value = "0.0", inclusive = false, message = "El monto debe ser mayor que 0")
        BigDecimal totalAmount,

        @Schema(description = "Estado de la factura", example = "PENDING")
        BillingStatus status, // opc, por defecto es estado PENDING

        @Schema(description = "Fecha de pago", example = "2025-10-10T15:10:00Z")
        OffsetDateTime paidAt, // opc

        @Schema(description = "Método de pago", example = "Efectivo")
        @Size(max = 50, message = "El método de pago no debe exceder los 50 caracteres")
        String paymentMethod, // opc

        @Schema(description = "Notas adicionales", example = "Incluye descuento del 10%")
        @Size(max = 255, message = "Las notas no deben exceder los 255 caracteres")
        String notes,

        @Schema(description = "Indicador de existencia", example = "true")
        Boolean enabled
) {
}
