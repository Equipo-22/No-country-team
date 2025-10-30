import { AppointmentMutationsService } from "@/_service/use-mutation-services/appointment-mutation-services";
import { AppointmentType } from "@/_types/appointment-type";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";

type AppointmentCalendarProps = {
  idPatient: string
}

export default function AppointmentCalendar({ idPatient }: AppointmentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [futureAppointments, setFutureAppointments] = useState<Date[]>([])

  const { mutationGetAppointmentsByIdPatient } = AppointmentMutationsService()


useEffect(() => {
  if (!idPatient) return;

  mutationGetAppointmentsByIdPatient.mutate(idPatient, {
    onSuccess: (data: AppointmentType[]) => {
      const now = new Date();

      const startDates = data.map((a: any) => new Date(a.startTime));

      const futureAppointments = startDates.filter(date => date >= now);

      setFutureAppointments(futureAppointments);

    },
  });
}, [idPatient]);


  return (
    <Calendar
      locale={es}
      mode="single"
      selected={date}
      onSelect={setDate}
      className="w-full rounded-md border shadow-sm [&_.rdp-day:focus]:bg-red"
      captionLayout="dropdown"
      modifiers={{
        booked: futureAppointments,
      }}
      modifiersClassNames={{
        booked: "border-2 border-secondary text-secondary font-bold rounded-full hover:bg-secondary hover:text-white transition-colors",
      }}
    />
  );
}
