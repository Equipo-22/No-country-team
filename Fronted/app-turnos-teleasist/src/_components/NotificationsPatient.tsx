import { notifications } from "@/_mock/notifications";
import {
  Repeat2,
  CircleX,
  BellRing,
  NotepadText,
  ClockFading,
} from "lucide-react";

const NotificationsPatient = () => {
  return (
    <div className="p-[2rem]">
      <h3 className="text-[2rem] text-secondary font-bold">
        Mis notificaciones
      </h3>

      {
        notifications.map(e => (
          <div className="flex gap-5 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem]" key={e.time}>
            <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
              {e.typeInfo === "disponibilidad" && <ClockFading className="text-blue-900" />}
              {e.typeInfo === "historial" && <NotepadText className="text-emerald-500" />}
              {e.typeInfo === "recordatorio" && <BellRing className="text-cyan-500" />}
              {e.typeInfo === "reprogramada" && <Repeat2 className="text-secondary" />}
              {e.typeInfo === "cancelada" && <CircleX className="text-red-500" />}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-2">
                <p className="font-bold">{e.title}</p>
                <p>
                  {e.body}
                </p>
              </div>
              <p className="text-sm text-gray-500 flex justify-end">
                {e.time}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default NotificationsPatient;
