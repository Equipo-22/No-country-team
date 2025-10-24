import { apiGeneral } from "../general-api";
import { VerifyUserType } from "@/_types/verifyUser-type";

export const postVerifyUserRegister = async (data: VerifyUserType) => {
  try {
    console.log("Payload a enviar:", data);
    const res = await apiGeneral.post("/register/verify-user", data);
    console.log("Código OK - Usuario verificado");
    return res.data;
  } catch (error: any) {
    console.log(error);
    
    const status = error.response?.status;
    const code = error.response?.data?.code;
    const message = error.response?.data?.message;

    let friendlyMessage = "Error desconocido";
    if (code === "VERIFICATION_CODE_EXPIRED") {
      friendlyMessage = "El código de verificación expiró. Solicita uno nuevo";
    }  else if (code === "INVALID_VERIFICATION_CODE") {
      friendlyMessage = "El código ingresado es inválido. Reintente o solicite uno nuevo";
    }else if (status === 500) {
      friendlyMessage = "Error interno del servidor, intente más tarde";
    } else if (message) {
      friendlyMessage = message;
    }
    throw new Error(friendlyMessage);
  }
};

export const postVerifyUserLogin = async (data: VerifyUserType) => {
  try {
    console.log("Payload a enviar:", data);
    const res = await apiGeneral.post("/login/verify-user", data);
    console.log("Código OK - Usuario verificado");
    return res.data;
  } catch (error: any) {
    console.log(error);
    
    const status = error.response?.status;
    const code = error.response?.data?.code;
    const message = error.response?.data?.message;

    let friendlyMessage = "Error desconocido";
    if (code === "VERIFICATION_CODE_EXPIRED") {
      friendlyMessage = "El código de verificación expiró. Solicita uno nuevo";
    }  else if (code === "INVALID_VERIFICATION_CODE") {
      friendlyMessage = "El código ingresado es inválido. Reintente o solicite uno nuevo";
    }else if (status === 500) {
      friendlyMessage = "Error interno del servidor, intente más tarde";
    } else if (message) {
      friendlyMessage = message;
    }
    throw new Error(friendlyMessage);
  }
};
