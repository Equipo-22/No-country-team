import { z } from "zod"


export const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    confirmpassword: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
