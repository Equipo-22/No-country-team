import { AppointmentType } from "@/_types/appointment-type";
import { useMutation } from "@tanstack/react-query";
import { getAppointmentsByIdPatient, postAppointment } from "../use-cases/appointment-service";


export const AppointmentMutationsService = () => {

  const mutationPostAppointment = useMutation({
    mutationFn: (data: AppointmentType) => {
      return postAppointment(data);
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  const mutationGetProfileByIdPatient = useMutation({
    mutationFn: (id: string) => {
      return getAppointmentsByIdPatient(id);
    },
    onSuccess: function Exito() {
      console.log("Se obtuvo las citas del paciente");
    },
  });


  return {
    mutationPostAppointment,
    mutationGetProfileByIdPatient
   
  };
};
