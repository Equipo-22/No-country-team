import { Button } from "@/components/ui/button";
import { CirclePlus, ChevronRight, CircleUser } from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";
import { useRouter } from "next/navigation";

type AppointmentItemProps = {
  onOpenUpcoming: (id: string) => void;
  onOpenHistory: (id: string) => void;
  doctors: {
    content: any[];
  };
  appointments: any[];
};

const AppointmentItem = ({
  onOpenUpcoming,
  onOpenHistory,
  doctors,
  appointments = [],
}: AppointmentItemProps) => {
  const router = useRouter();

  const upcomingAppointments = appointments.filter(
    (appointment: any) => new Date() < new Date(appointment.startTime)
  );

  const historyAppointments = appointments.filter(
    (appointment: any) => new Date() > new Date(appointment.startTime)
  );
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <Button
          onClick={() => router.push("/dashboard-patient/appointment/create")}
          className="w-full lg:w-[200px] lg:order-2 my-6"
        >
          <CirclePlus /> Nueva cita
        </Button>
        <TitleSection text="Próximas citas" />
      </div>

      {upcomingAppointments.map((appointment: any) => (
        <div key={appointment.id} className="flex flex-col gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:gap-0 lg:items-center lg:flex-row lg:justify-between">
          <div className="flex items-center gap-2 lg:items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <CircleUser className="text-gray-500" />
            </div>
            <p>
              <strong>{doctors?.content?.find((doctor: any) => doctor.id === appointment.professionalId)?.name}</strong>
            </p>
          </div>
          <p>{doctors?.content?.find((doctor: any) => doctor.id === appointment.professionalId)?.specialty}</p>
          <p>{new Date(appointment.startTime).toLocaleDateString()}</p>
          <p>{(() => {
                  const time = new Date(appointment.startTime);
                  time.setHours(time.getHours() - 5);
                  return time.toLocaleTimeString();
                })()}</p>
          <Button variant="outline">{appointment.status}</Button>
          <Button variant="outline">{appointment.type}</Button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => onOpenUpcoming(appointment.id)}
          >
            <ChevronRight />
          </button>
        </div>
      ))}

      <TitleSection text="Historial de citas" />

      {historyAppointments.map((appointment) => (
        <div key={appointment.id} className="flex flex-col gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:gap-0 lg:items-center lg:flex-row lg:justify-between">
          <div className="flex items-center gap-2 lg:items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <CircleUser className="text-gray-500" />
            </div>
            <p>
              <strong>{doctors?.content?.find((doctor: any) => doctor.id === appointment.professionalId)?.name}</strong>
            </p>
          </div>
          <p>{doctors?.content?.find((doctor: any) => doctor.id === appointment.professionalId)?.specialty}</p>
          <p>{new Date(appointment.startTime).toLocaleDateString()}</p>
          <p>{new Date(appointment.endTime).toLocaleTimeString()}</p>
          <Button variant="outline">{appointment.status}</Button>
          <Button variant="outline">{appointment.type}</Button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => onOpenHistory(appointment.id)}
          >
            <ChevronRight />
          </button>
        </div>
      ))}
    </>
  );
};

export default AppointmentItem;
