import { RegisterType } from "@/_types/register-type";
import { apiGeneral } from "../general-api";


export const postRegister = async (data: RegisterType) => {
    try {
        const res = await apiGeneral.post("/register", data)
        console.log("Registro creado")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}