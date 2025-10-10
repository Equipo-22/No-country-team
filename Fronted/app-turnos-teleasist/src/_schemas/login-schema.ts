import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({
    message: "Tu correo electrónico no es válido",
  }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(8, { message: "La contraseña no puede superar los 8 caracteres" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/, {
      message: "La contraseña debe incluir mayúsculas, minúsculas y números",
    }),
});
