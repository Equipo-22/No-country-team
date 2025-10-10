import { z } from "zod"


export const formSchema = z.object({
    username: z.string().min(2, {
        message: "Escribe tu nombre y apellido completo",
    }),
    email: z.string().min(2, {
        message: "Escribe tu email",
    }),
    password: z.string().min(2, {
        message: "Escribe tu contraseña",
    }),
    confirmpassword: z.string().min(2, {
        message: "Confirma tu contraseña",
    }),
})
