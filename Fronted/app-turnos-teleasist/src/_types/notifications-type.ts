export interface Notifications {
    title: string
    body: string
    typeInfo: "reprogramada" | "cancelada" | "historial" | "disponibilidad" | "recordatorio"
    time: string
  }
