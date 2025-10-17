import { ResetPassType } from "@/_types/resetPass-type";
import { apiGeneral } from "../general-api";

export const postResetPass = async (data: ResetPassType) => {
    try {
        console.log("Enviando a backend:", data);
        const res = await apiGeneral.post("/reset-password", data,  { headers: { "Content-Type": "application/json" }} )
        console.log("Cambio de contraseña exitoso")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}