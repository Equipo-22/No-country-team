import { z } from "zod";

const generoEnum = z.enum(["femenino", "masculino", "otro"] as const);

export const completeProfilePatientSchema = z
  .object({
    dni: z.string().regex(/^[0-9]{8}$/, {
      message: "El DNI debe tener exactamente 8 números sin puntos ni espacios",
    }),

    genero: generoEnum,

    cobertura: z.enum(["obra_social", "particular"], {
    message: "Seleccioná una opción",
  }),

    obra_social: z.string().optional(),
    nro_afiliado: z.string().optional(),

    telefono: z.string().regex(/^\+?\d{10,15}$/, {
      message:
        "El teléfono debe tener entre 10 y 15 dígitos (puede incluir código de país)",
    }),

    direccion: z.string().min(1, { message: "La dirección es obligatoria" }),
  })
  .refine(
    (data) => !data.cobertura || (data.obra_social && data.nro_afiliado),
    {
      message:
        "Si cobertura es true, 'obra_social' y 'nro_afiliado' son obligatorios",
      path: ["obra_social"],
    }
  );
