import { RegisterType } from "@/_types/register-type";
import { apiRegister } from "../general-api";


// export const getCategoria = async () => {
//     try {
//         const res = await apiCategoria.get("/categoria")
//         return res.data
//     } catch (error) {
//         console.log(error)
//     }
// }

export const postRegister = async (data: RegisterType) => {
    try {
        const res = await apiRegister.post("/register", data)
        console.log("Categoria creado")
        return res.data
    } catch (error) {
        console.log(error)
    }
}