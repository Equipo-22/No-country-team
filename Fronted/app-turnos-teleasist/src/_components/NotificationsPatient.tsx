import {
  Eye,
  EyeClosed,
} from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { NotificationMutationsService } from "@/_service/use-mutation-services/notification-mutation-services";
import { NotificationType } from "@/_types";

const NotificationsPatient = () => {

  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const { idPatient } = useUserStore()

  const { mutationGetNotificationsByIdPatient } = NotificationMutationsService()

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

  useEffect(() => {
    if (!idPatient) return;

    mutationGetNotificationsByIdPatient.mutate(idPatient, {
      onSuccess: (data) => {
        setNotifications(data)
      }
    })

  }, [!idPatient])


  return (
    <>
      <TitleSection text="Mis notificaciones" />

      {notifications.map((notification) => (
        <div
          className="flex gap-5 px-4 py-2 rounded-sm shadow-sm bg-white my-1.5"
          key={notification.id}
        >
          <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
            {notification.read === false ? <EyeClosed /> : <Eye />}

          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{notification.title}</p>
              <p>{notification.description}</p>
            </div>
            <p className="text-sm text-gray-500 flex justify-end">{getElapsedTime(notification.date)}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default NotificationsPatient;


{/* <div
          className="flex gap-5 px-4 py-2 rounded-sm shadow-sm bg-white my-1.5"
          key={e.time}
        >
          <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
            {e.typeInfo === "disponibilidad" && (
              <ClockFading className="text-blue-900" />
            )}
            {e.typeInfo === "historial" && (
              <NotepadText className="text-emerald-500" />
            )}
            {e.typeInfo === "recordatorio" && (
              <BellRing className="text-cyan-500" />
            )}
            {e.typeInfo === "reprogramada" && (
              <Repeat2 className="text-secondary" />
            )}
            {e.typeInfo === "cancelada" && <CircleX className="text-red-500" />}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{e.title}</p>
              <p>{e.body}</p>
            </div>
            <p className="text-sm text-gray-500 flex justify-end">{e.time}</p>
          </div>
        </div> */}