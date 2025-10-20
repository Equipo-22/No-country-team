package com.example.billing.features.billing.model;

public enum BillingStatus {
    PENDING, // la factura fue creada, pero aún no se ha pagado
    PAID, // la factura fue pagada
    CANCELLED, // la factura fue anulada o cancelada
    REFUNDED // se realizó un reembolso
}
