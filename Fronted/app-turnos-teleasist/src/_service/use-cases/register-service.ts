import { RegisterType } from "@/_types/register-type";
import { apiGeneral } from "../general-api";


export const postRegister = async (data: RegisterType) => {
  try {
    const res = await apiGeneral.post("/register", data);
    return res.data;
  } catch (error: any) {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    const message = error.response?.data?.message;

    let friendlyMessage = "Error desconocido";
    if (code === "USER_ALREADY_EXISTS") {
      friendlyMessage = "El usuario ya existe, por favor inicia sesión";
    } else if (status === 500) {
      friendlyMessage = "Error interno del servidor, intenta más tarde";
    } else if (message) {
      friendlyMessage = message;
    }

    throw new Error(friendlyMessage);
  }
};