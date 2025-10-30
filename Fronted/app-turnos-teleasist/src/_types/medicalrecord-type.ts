export interface MedicalRecordType{
  appointmentId: string;
  conditions?: Condition[];
  observations?: Observation[];
  medications?: Medication[];
}

export interface Condition {
  patientId: string;
  encounterId: string;
  description: string;
  clinicalStatus: string;
  severity: string;
  onsetDateTime: string; 
}

export interface Observation {
  pacienteId: string;
  descripcion: string;
  valor: string;
  fecha: string;
  encounterId: string;
}

export interface Medication {
  patientId: string;
  medicationId: string;
  encounterId: string;
  practitionerId: string;
  status: string;
  intent: string;
  dosageInstruction: string;
  authoredOn: string; 
}