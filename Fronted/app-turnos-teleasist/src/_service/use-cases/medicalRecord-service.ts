import { apiEHRService } from "../general-api";

/* export const postRecord = async (data: MedicalRecordType) => {
  try {
    const res = await apiEHRService.post("/patient/history", data);
    console.log("Se creó un registro de consulta");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}; */

export const getRecordById = async (id: string) => {
  try {
    const res = await apiEHRService.get(`/history/${id}`);
    console.log("Datos de la consulta", id);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMedicalRecordByIdPatient = async (id: string) => {
  try {
    const res = await apiEHRService.get(`/patient/${id}/history`);
    console.log("Historia clinica de patiente", id);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




