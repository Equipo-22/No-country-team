import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin, CheckCircle, Calendar1, Clock, CalendarDays} from "lucide-react";

const AppointmentConfirmationSuccess = () => {
  const router = useRouter();

  const handleAccept = () => {
    router.push("/dashboard-patient/inicio");
  };
  return (
    <div className="p-[2rem]">
      <h3 className="flex items-center justify-center gap-2 text-[2rem] text-secondary font-bold">
        <CheckCircle className="size-10 text-green-500" />
        ¡Tu cita ha sido agendada con éxito!
      </h3>

      <div className="flex flex-col items-center justify-center gap-5 ">
        <div className="flex flex-col items-center justify-center gap-10 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem]  lg:py-[2rem] w-full">
          <p className="text-xl ">
            Se agendo tu <strong>cita presencial</strong> del{" "}
            <strong>Consuta de Medicida Gerneral</strong> con el profesional{" "}
            <strong>Dr. Juan Cruz Gómez</strong>
          </p>

          <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold">
              <CalendarDays />
              <p>Viernes</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold">
              <Calendar1 />
              <p>02/11/25</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold">
              <Clock />
              <p>07:50 pm</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold text-secondary">
              <MapPin />
              <p>Sede centro</p>
            </div>
          </div>
        </div>

        <Button onClick={handleAccept}>Aceptar</Button>
      </div>
    </div>
  );
};

export default AppointmentConfirmationSuccess;
