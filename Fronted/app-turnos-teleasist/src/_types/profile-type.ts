export interface ProfileType {
  dni: string;
  fecha_nacimiento: Date;
  genero: "femenino" | "masculino" | "otro";
  cobertura: "obra_social" | "particular";
  obra_social?: string | undefined;
  nro_afiliado?: string | undefined;
  telefono: string;
  direccion: string;
}


