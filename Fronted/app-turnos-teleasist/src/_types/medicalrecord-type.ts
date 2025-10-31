export interface Condition {
  id: string;
  patientId: string;
  encounterId: string;
  description: string;
  clinicalStatus: string;
  severity: string;
  onsetDateTime: string; 
}

export interface Observation {
  id: string;
  pacienteId: string;
  descripcion: string;
  valor: string;
  fecha: string; 
  encounterId: string;
}

export interface Medication {
  id?: string;
  patientId?: string;
  medicationId?: string;
  encounterId?: string;
  practitionerId?: string;
  status?: string;
  intent?: string;
  dosageInstruction?: string;
  authoredOn?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  nationalId: string | null;
  hospitalId: string | null;
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelationship: string | null;
}

export interface Encounter {
  conditions?: Condition[];
  observations?: Observation[];
  medications?: Medication[];
}

export interface FullEncounters {
  content: Encounter[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface MedicalRecordResponse {
  patient: Patient;
  fullEncounters: FullEncounters;
}

export interface Appointment {
  id: string;
  motivo: string;
  lugar: string;
  type: string;
  status: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  meetingUrl: string | null;
  cancelledBy: string | null;
  patientId: string;
  professionalId: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  licenseNumber: string;
  userId: string;
  enabled: boolean;
  createdAt: string;
}

export interface DataRecordType {
  appointment: Appointment;
  doctor: Doctor;
  conditions?: Condition[];
  observations?: Observation[];
  medications?: Medication[];
}
