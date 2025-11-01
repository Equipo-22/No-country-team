import { ResetPassType } from "@/_types/resetPass-type";
import { apiAuthService } from "../general-api";

export const postResetPass = async (data: ResetPassType) => {
    try {
        console.log("Enviando a backend:", data);
        const res = await apiAuthService.post("/reset-password", data,  { headers: { "Content-Type": "application/json" }} )
        console.log("Cambio de contraseña exitoso")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}