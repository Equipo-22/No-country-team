export interface AppointmentType{
  id: string;
  patientId: string;
  professionalId: string;
  meetingUrl: string | null;
  startTime: string; 
  endTime: string;
  type: "PRESENCIAL" | "VIRTUAL";  
  cancelledBy: string | null;
  motivo: string;
  lugar: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED"; 
  createdAt: string; 
}

