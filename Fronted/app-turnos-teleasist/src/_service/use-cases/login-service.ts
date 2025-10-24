import { apiGeneral } from "../general-api";
import { LoginType } from "@/_types/login-type";

export const postLogin = async (data: LoginType) => {
  try {
    const res = await apiGeneral.post("/login", data);
    console.log("Inicio de sesion exitoso");
    return res.data;
  } catch (error: any) {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    const message = error.response?.data?.message;

    let friendlyMessage = "Error desconocido";
    if (code === "USER_NOT_FOUND") {
      friendlyMessage = "El usuario no fue encontrado. Por favor registrarse";
    } else if (code === "INVALID_CREDENTIALS") {
      friendlyMessage = "Credenciales inválidas. Intente nuevamente";
    }  else if (code === "ACCOUNT_NOT_VERIFIED") {
      friendlyMessage = "Cuenta no verificada. Revise su email para verificarla";
    } else if (code === "INCORRECT_PASSWORD") {
      friendlyMessage = "Credenciales inválidas. Intente nuevamente";
    } else if (status === 500) {
      friendlyMessage = "Error interno del servidor, intente más tarde";
    } else if (message) {
      friendlyMessage = message;
    }

    throw new Error(friendlyMessage);
  }
};
