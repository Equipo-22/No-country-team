import { apiGeneral } from "../general-api";
import { VerifyUserType } from "@/_types/verifyUser-type";

export const postVerifyUserRegister = async (data: VerifyUserType) => {
    try {
        console.log("Payload a enviar:", data)
        const res = await apiGeneral.post("/register/verify-user", data)
        console.log("Código OK - Usuario verificado")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const postVerifyUserLogin = async (data: VerifyUserType) => {
    try {
        console.log("Payload a enviar:", data)
        const res = await apiGeneral.post("/login/verify-user", data)
        console.log("Código OK - Usuario verificado")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}