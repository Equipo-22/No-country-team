import axios from "axios";

export const apiRegister = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_CITAS}`
})