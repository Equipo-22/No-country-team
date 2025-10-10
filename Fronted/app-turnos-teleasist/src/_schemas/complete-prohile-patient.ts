import { z } from "zod"


export const completeProphilePatientSchema = z.object({
    dni: z.number().min(2, {
        message: "Pon tu DNI correctamente",
    }),
    obra_social: z.string().min(2, {
        message: "Pon tu obra social correctamente",
    }),
    nombre_obra_social: z.string().min(2, {
        message: "Pon tu obra social correctamente",
    }),
    nombre_afiliado: z.string().min(2, {
        message: "Pon tu nombre de afiliado correctamente",
    }),
    numero_afiliado: z.number().min(2, {
        message: "Pon tu nombre de afiliado correctamente",
    }),
    tel: z.number().min(2, {
        message: "Pon tu celular correctamente",
    }),
    direccion: z.string().min(2, {
        message: "Pon tu direccion de domicilio correctamente",
    }),
})
