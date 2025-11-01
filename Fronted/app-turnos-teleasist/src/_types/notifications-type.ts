export interface Notifications {
    title: string
    body: string
    typeInfo: "reprogramada" | "cancelada" | "historial" | "disponibilidad" | "recordatorio"
    time: string
  }

export interface NotificationType {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'OTRO' | string;
  date: Date;
  appointmentId: string;
  read: boolean;
}