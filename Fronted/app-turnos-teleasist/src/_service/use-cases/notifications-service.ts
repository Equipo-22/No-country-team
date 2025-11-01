
import { apiNotificationService } from "../general-api";


export const postNotificationAsReaded = async (id: string) => {
  try {
    const res = await apiNotificationService.post(`/${id}`);
    console.log("Notificación marcada como leída");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getNotificationsByIdPatient = async (id: string) => {
  try {
    const res = await apiNotificationService.get(`/${id}`);
    console.log("Listado de notificaciones de", id);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteNotificationById = async (id: string) => {
  try {
    const res = await apiNotificationService.delete(`/${id}`);
    console.log("Se borró la notificación", id);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};