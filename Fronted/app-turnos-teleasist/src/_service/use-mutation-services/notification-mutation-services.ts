import { useMutation} from "@tanstack/react-query";
import { deleteNotificationById, postNotificationAsReaded } from "../use-cases/notifications-service";


export const NotificationMutationsService = () => {
  const mutationPostNotificationAsReaded = useMutation({
    mutationFn: (id: string) => {
      return postNotificationAsReaded(id);
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

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
    mutationDeleteNotificationsById
  };
};
