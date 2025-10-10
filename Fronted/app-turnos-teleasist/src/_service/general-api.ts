import axios from "axios";


// esta api se puede reutilizar, no hace falta repetir esta constante
export const apiGeneral = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_CITAS}`
})
