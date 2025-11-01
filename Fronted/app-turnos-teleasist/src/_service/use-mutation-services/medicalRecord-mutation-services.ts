
import { useMutation } from "@tanstack/react-query";
import {
  getMedicalRecordByIdPatient,
  getRecordById
} from "../use-cases/medicalRecord-service";

export const MedicalRecordMutationsService = () => {
  
  const mutationGetMedicalRecordByIdPatient = useMutation({
    mutationFn: (id: string) => {
      return getMedicalRecordByIdPatient(id);
    },
    onSuccess: function Exito() {
      console.log("Se obtuvo la historia clinica del paciente");
    },
  });

  const mutationGetRecordById = useMutation({
    mutationFn: (id: string) => {
      return getRecordById(id);
    },
    onSuccess: function Exito() {
      console.log("Se obtuvo el registro de consulta");
    },
  });

  return {
    mutationGetMedicalRecordByIdPatient,
    mutationGetRecordById,
  };
};
