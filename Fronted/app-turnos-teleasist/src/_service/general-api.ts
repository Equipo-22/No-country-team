import axios from "axios";

export const apiAuthService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/api/auth`
})

export const apiPatientService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/patient`
})

export const apiAppointmentService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/appointment`
})

export const apiDoctorService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/doctor`
})

export const apiEHRService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/ehr`
})

export const apiNotificationService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/notification`
})