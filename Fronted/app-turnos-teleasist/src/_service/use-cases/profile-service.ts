import { ProfileType } from "@/_types/profile-type";
import { apiGeneral } from "../general-api";


export const postProfile = async (data: ProfileType) => {
    try {
        const res = await apiGeneral.post("/profile", data)
        console.log("Perfil de usuario completo")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}