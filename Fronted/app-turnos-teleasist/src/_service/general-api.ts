import axios from "axios";

export const apiGeneral = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_CITAS}`
})
