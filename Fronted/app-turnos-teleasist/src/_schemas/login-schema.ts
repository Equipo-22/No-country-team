import { z } from "zod"


export const formSchema = z.object({
    email: z.string().email( {
        message: "Email no válido",
    }),
    password: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    })
})
