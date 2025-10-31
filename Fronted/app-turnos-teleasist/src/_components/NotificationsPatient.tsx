import {
  CheckCheck,
  Eye,
  EyeClosed,
  Trash2,
} from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";
import { useUserStore } from "@/store/userStore";
import { NotificationMutationsService } from "@/_service/use-mutation-services/notification-mutation-services";
import { useGetNotificationsByIdPatient } from "@/_service/use-queries-services/notification-querie-service";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const NotificationsPatient = () => {

  const { idPatient } = useUserStore()
  const queryClient = useQueryClient();

  const { data: notifications = [],  refetch } = useGetNotificationsByIdPatient(idPatient);
  const { mutationPostNotificationAsReaded, mutationDeleteNotificationsById } = NotificationMutationsService();

  const getElapsedTime = (date: string | Date) => {
    const past = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - past.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} h`;
    if (minutes > 0) return `hace ${minutes} min`;
    return `hace unos segundos`;
  };

const handleMarkAsRead = (id: string) => {
  mutationPostNotificationAsReaded.mutate(id, {
    onSuccess: () => {
      queryClient.setQueryData(["notifications", idPatient], (oldData: any) => {
        if (!oldData) return [];
        return oldData.map((n: any) =>
          n.id === id ? { ...n, read: true } : n
        );
      });
      refetch();
    },
  });
};

  const handleDelete = (id: string) => {
    mutationDeleteNotificationsById.mutate(id, {
      onSuccess: () => {
        refetch(),
        console.log('Se eliminó');
      }
    });
  };

  useEffect(() => {

  }, [notifications])

  return (
    <>
      <TitleSection text="Mis notificaciones" />

      {notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
        <div
          className="flex gap-5 px-4 py-2 rounded-sm shadow-sm bg-white my-1.5"
          key={notification.id}
        >
          <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
            {notification.read === false ? <EyeClosed className="text-secondary"/> : <Eye className="text-accent"/>}

          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{notification.title}</p>
              <p>{notification.description}</p>
            </div>
            <div className="flex justify-end gap-4 mt-3 mb-2 md:mt-0">
              {notification.read ? "" : <CheckCheck
                className="text-accent cursor-pointer hover:opacity-70 transition"
                onClick={() => handleMarkAsRead(notification.id)}
              />}
              <Trash2
                className="text-destructive cursor-pointer hover:opacity-70 transition"
                onClick={() => handleDelete(notification.id)}
              />
              <p className="text-sm text-gray-500 ">{getElapsedTime(notification.date)}</p>
            </div>
          </div>
        </div>
      ))
      ):(
        <p className="mt-3">No existen notificaciones por el momento.</p>
      )}
    </>
  );
};

export default NotificationsPatient;

