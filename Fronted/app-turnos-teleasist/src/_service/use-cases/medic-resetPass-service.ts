import { ResetPassType } from "@/_types/resetPass-type";
import { apiGeneral } from "../general-api";

export const postResetPass = async (data: ResetPassType) => {
    try {
        const res = await apiGeneral.post("/login", data)
        console.log("Cambio de contraseña exitoso")
        return res.data
    } catch (error) {
        console.log(error)
    }
}