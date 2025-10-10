import { z } from "zod";

export const formSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      })
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, {
        message: "El nombre de usuario solo puede contener letras",
      }),
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
    confirmpassword: z.string({
      message: "Debe confirmar la contraseña",
    }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmpassword"], // el error aparece en el campo de confirmación
  });
