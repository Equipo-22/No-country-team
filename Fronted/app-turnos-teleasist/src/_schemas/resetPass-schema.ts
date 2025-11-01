import { z } from "zod";

export const resetPassSquema = z.object({
  token: z.string().min(15, {
    message: "El token ingresado no es válido",
  }),
  nuevaPassword: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(8, { message: "La contraseña no puede superar los 8 caracteres" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/, {
      message: "La contraseña debe incluir mayúsculas, minúsculas y números",
    }),
});
