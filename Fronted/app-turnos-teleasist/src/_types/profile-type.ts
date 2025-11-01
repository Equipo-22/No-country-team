// Original para formulario / front
export interface ProfileType {
  userId: string;
  nombre: string;
  email: string;
  dni: string;
  genero: "femenino" | "masculino" | "otro";
  fechaNacimiento: Date; // Date para react-datepicker
  cobertura: "obra_social" | "particular";
  telefono: string;
  direccion: string;
  obraSocial?: string | null;
  numeroAfiliado?: string | null;
}

// Para enviar al backend (LocalDate)
export interface ProfilePayload {
  userId: string;
  nombre: string;
  email: string;
  dni: string;
  genero: "femenino" | "masculino" | "otro";
  fechaNacimiento: string; // "YYYY-MM-DD"
  cobertura: "obra_social" | "particular";
  telefono: string;
  direccion: string;
  obraSocial?: string | null;
  numeroAfiliado?: string | null;
}
