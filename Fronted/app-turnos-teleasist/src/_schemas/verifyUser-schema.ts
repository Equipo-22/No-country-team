import { z } from "zod";

export const verifyUserSchema = z.object({
  email: z.string().email({
      message: "Tu correo electrónico no es válido",
    }),
  verificationCode: z
    .string()
    .length(6, { message: "El código debe tener 6 dígitos." })
    .regex(/^[0-9]+$/, { message: "Solo se permiten números." }),
})

