import { apiGeneral } from "../general-api";
import { ReqPassResetType } from "@/_types/reqPassReset-type";

export const postReqPassReset = async (data: ReqPassResetType) => {
  try {
    console.log("Enviando a backend:", data);
    const res = await apiGeneral.post(
      `/solicitar-reset-password?email=${data.email}`
    );
    console.log("Se solicitó restablecer la contraseña");
    return res.data;
  } catch (error) {
    console.error("Error al solicitar reset de contraseña:", error);
    throw error;
  }
};
