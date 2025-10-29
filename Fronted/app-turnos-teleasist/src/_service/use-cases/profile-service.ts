import { ProfilePayload } from "@/_types/profile-type";
import { apiPatientService } from "../general-api";


export const postProfile = async (data: ProfilePayload) => {
    try {
        const res = await apiPatientService.post("/", data)
        console.log("Perfil de usuario completo")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProfileByIdPatient = async (id: string) => {
    try {
        const res = await apiPatientService.get(`/${id}`)
        console.log("Perfil de usuario", res)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProfileByIdUser = async (id: string) => {
    try {
        const res = await apiPatientService.get(`/byUserId/${id}`)
        console.log("Perfil de usuario", res)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}