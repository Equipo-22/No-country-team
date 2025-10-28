import { z } from "zod";

export const completeProfilePatientSchema = z
  .object({
    dni: z
      .string()
      .regex(/^[0-9]{8}$/, { message: "El DNI debe tener 8 números, sin puntos" }),
    fechaNacimiento: z.date({ message: "La fecha es obligatoria" }),
    genero: z
      .enum(["femenino", "masculino", "otro"])
      .refine((val) => val !== undefined, {
        message: "Seleccioná un género válido",
      }),
    cobertura: z.enum(["obra_social", "particular"]),
    obraSocial: z.string().optional(),
    numeroAfiliado: z.string().optional(),
    telefono: z
      .string()
      .regex(/^\+?\d{10,15}$/, { message: "Teléfono inválido" }),
    direccion: z.string().min(1, { message: "La dirección es obligatoria" }),
  })
  .refine(
    (data) =>
      data.cobertura === "particular" ||
      (data.obraSocial?.trim() && data.numeroAfiliado?.trim()),
    {
      message: "Si seleccionás obra social, debés completar los campos",
      path: ["obra_social"],
    }
  );
