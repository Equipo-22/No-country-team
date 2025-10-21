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

      <div className="flex gap-5 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem]">
        <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
          <Repeat2 className="text-secondary" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Tu cita ha sido reprogramada.</p>
            <p>
              La consulta con el Dr. Juan Cruz Gómez fue movida al 10/ 11/25 a
              las 10:00hs. Si el nuevo horario no te resulta cómodo, podés
              modificarlo desde “Mis citas”.
            </p>
          </div>
          <p className="text-sm text-gray-500 flex justify-end">
            Hace 15 minutos.
          </p>
        </div>
      </div>

      <div className="flex gap-5 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem]">
        <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center">
          <CircleX className="text-red-500" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Tu cita fue cancelada.</p>
            <p>
              El Dr. Juan Cruz Gómez canceló la consulta programada para ell 02/
              11/25 a las 07:00hs. Podés agendar una nueva cita desde “Mis
              citas” o elegir otro profesional.
            </p>
          </div>
          <p className="text-sm text-gray-500 flex justify-end">
            Hace 30 minutos.
          </p>
        </div>
      </div>

      <div className="flex gap-5 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem]">
        <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
          <BellRing className="text-cyan-500" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Recordatorio de cita próxima.</p>
            <p>
              Tenés una consulta con el Dr. Juan Cruz Gómez el 02/11/25 a las
              07:00hs. Tipo de cita: presencial
            </p>
          </div>
          <p className="text-sm text-gray-500 flex justify-end">Hace 1 hora.</p>
        </div>
      </div>

      <div className="flex gap-5 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem]">
        <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
          <NotepadText className="text-emerald-500" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Actualización del historial clínico</p>
            <p>
              El Dr. Juan Cruz Gómez agregó nueva información a tu historia
              clínica. Ingresá en “Historia clínica” para revisar la
              información.
            </p>
          </div>
          <p className="text-sm text-gray-500 flex justify-end">
            Hace 2 días.{" "}
          </p>
        </div>
      </div>

      <div className="flex gap-5 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem]">
        <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
          <ClockFading className="text-blue-900" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Hay nuevos turnos disponibles</p>
            <p>
              Se liberaron horarios con el Dr. Carlos Rodriguez que podrían
              interesarte. Reserva tu cita antes de que se complete el cupo.
            </p>
          </div>
          <p className="text-sm text-gray-500 flex justify-end">
            Hace 1 semana.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPatient;
