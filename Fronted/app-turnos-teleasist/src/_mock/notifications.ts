import { Notifications } from "@/_types/notifications-type";

export const notifications: Notifications[] = [
    { title: "Tu cita ha sido reprogramada.", body: "La consulta con el Dr. Juan Cruz Gómez fue movida al 10/11/25 a las 10:00hs. Si el nuevo horario no te resulta cómodo, podés modificarlo desde “Mis citas”.", typeInfo: "reprogramada", time: "Hace 15 minutos." },
    { title: "Tu cita fue cancelada.", body: "El Dr. Juan Cruz Gómez canceló la consulta programada para el 02/11/25 a las 07:00hs. Podés agendar una nueva cita desde “Mis citas” o elegir otro profesional.", typeInfo: "cancelada", time: "Hace 30 minutos." },
    { title: "Recordatorio de cita próxima.", body: "Tenés una consulta con el Dr. Juan Cruz Gómez el 02/11/25 a las 07:00hs. Tipo de cita: presencial.", typeInfo: "recordatorio", time: "Hace 1 hora." },
    { title: "Actualización del historial clínico", body: "El Dr. Juan Cruz Gómez agregó nueva información a tu historia clínica. Ingresá en “Historia clínica” para revisar la información.", typeInfo: "historial", time: "Hace 2 días." },
    { title: "Hay nuevos turnos disponibles", body: "Se liberaron horarios con el Dr. Carlos Rodriguez que podrían interesarte. Reserva tu cita antes de que se complete el cupo.", typeInfo: "disponibilidad", time: "Hace 1 semana." }
  ];