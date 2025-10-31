import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteNotificationById, getNotificationsByIdPatient, postNotificationAsReaded } from "../use-cases/notifications-service";
import { NotificationType } from "@/_types";


export const NotificationMutationsService = () => {
  const mutationPostNotificationAsReaded = useMutation({
    mutationFn: (id: string) => {
      return postNotificationAsReaded(id);
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

 /*  const mutationGetNotificationsByIdPatient = useMutation({
    mutationFn: (id: string) => {
      return getNotificationsByIdPatient(id);
    },
    onSuccess: function Exito() {
      console.log("Se obtuvo las notificaciones del paciente");
    },
  }); */

  const useGetNotificationsByIdPatient= (idPatient: string | undefined) => {
  return useQuery<NotificationType[]>({
    queryKey: ["notifications", idPatient],
    queryFn: () => getNotificationsByIdPatient(idPatient!),
    enabled: !!idPatient, 
    refetchInterval: 60000, // se actualiza cada 60 segundos
  });
};

   const mutationDeleteNotificationsById = useMutation({
    mutationFn: (id: string) => {
      return deleteNotificationById(id);
    },
    onSuccess: function Exito() {
      console.log("Se borró la notificación");
    },
  });


  return {
    mutationPostNotificationAsReaded,
   useGetNotificationsByIdPatient,
    mutationDeleteNotificationsById
  };
};
