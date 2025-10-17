import { z } from "zod";

export const reqPassResetSchema = z.object({
  email: z.string().email({
    message: "Tu correo electrónico no es válido",
  })
});
