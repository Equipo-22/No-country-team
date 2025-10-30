
import { useMutation } from "@tanstack/react-query";
import {
  getMedicalRecordByIdPatient,
  getRecordById,
  postRecord,
} from "../use-cases/medicalRecord-service";
import { MedicalRecordType } from "@/_types/medicalrecord-type";

export const medicalRecordMutationsService = () => {
  const mutationPostRecord = useMutation({
    mutationFn: (data: MedicalRecordType) => {
      return postRecord(data);
    },
    onSuccess: (data) => {
      console.log("Se registró una consulta", data);
    },
  });

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
    mutationPostRecord,
    mutationGetMedicalRecordByIdPatient,
    mutationGetRecordById,
  };
};
