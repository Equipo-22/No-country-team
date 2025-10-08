import { apiLogin} from "../general-api";
import { LoginType } from "@/_types/login-type";


export const postLogin = async (data: LoginType) => {
    try {
        const res = await apiLogin.post("/login", data)
        console.log("Inicio de sesion exitoso")
        return res.data
    } catch (error) {
        console.log(error)
    }
}