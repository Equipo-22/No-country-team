export interface ProfileType {
  userId: string,
  nombre: string,
  email: string,
  dni: string;
  genero: "femenino" | "masculino" | "otro";
  fechaNacimiento: Date
  cobertura: "obra_social" | "particular";
  telefono: string;
  direccion: string;
  obraSocial?: string | null;
  numeroAfiliado?: string | null;
}

