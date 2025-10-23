import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin, CheckCircle, Calendar1, Clock, CalendarDays } from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";

const AppointmentConfirmationSuccess = () => {
  const router = useRouter();

  const handleAccept = () => {
    router.push("/dashboard-patient/inicio");
  };
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <CheckCircle className="size-10 text-green-500" />
        <TitleSection text="¡Tu cita ha sido agendada con éxito!" />
      </div>
      <div className="flex flex-col items-center justify-center gap-5 ">
        <div className="flex flex-col items-center justify-center gap-10 px-4 py-2 rounded-sm shadow-sm bg-white my-8  lg:py-8 w-full">
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
    </>
  );
};

export default AppointmentConfirmationSuccess;
