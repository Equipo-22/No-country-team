import { AppointmentType } from "@/_types/appointment-type";
import { apiAppointmentService } from "../general-api";

export const postAppointment = async (data: AppointmentType) => {
  try {
    const res = await apiAppointmentService.post("/", data);
    console.log("Se creó una cita");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAppointment = async (id: string) => {
  try {
    const res = await apiAppointmentService.get(`/${id}`);
    console.log("Datos de cita", id);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAppointmentsByIdPatient = async (id: string) => {
  try {
    const res = await apiAppointmentService.get(`/patient/${id}`);
    console.log("Listado de citas de patiente", id);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    const res = await apiAppointmentService.delete(`/${id}`);
    console.log("Se borró la cita", id);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};