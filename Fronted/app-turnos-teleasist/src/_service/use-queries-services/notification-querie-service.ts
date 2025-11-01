import { NotificationType } from "@/_types";
import { useQuery } from "@tanstack/react-query";
import { getNotificationsByIdPatient } from "../use-cases/notifications-service";

export const useGetNotificationsByIdPatient= (idPatient: string | undefined) => {
  return useQuery<NotificationType[]>({
    queryKey: ["notifications", idPatient],
    queryFn: () => getNotificationsByIdPatient(idPatient!),
    enabled: !!idPatient, 
    refetchInterval: 60000, // se actualiza cada 60 segundos
  });
};
