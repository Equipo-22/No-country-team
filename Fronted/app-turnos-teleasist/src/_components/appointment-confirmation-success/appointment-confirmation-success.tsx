import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  MapPin,
  CheckCircle,
  Calendar1,
  Clock,
  CalendarDays,
} from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";

type AppointmentConfirmationSuccessProps = {
  selectedDoctor: any;
  selectedPlace: any;
  selectedStartTime: any;
  apptType: any;
};

const AppointmentConfirmationSuccess = ({
  selectedDoctor,
  selectedPlace,
  selectedStartTime,
  apptType,
}: AppointmentConfirmationSuccessProps) => {
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
            Se agendo tu <strong>Cita {apptType.toLowerCase()}</strong> de{" "}
            <strong>Consuta {selectedDoctor?.specialty}</strong> con el
            profesional <strong>{selectedDoctor?.name}</strong>
          </p>

          <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold">
              <CalendarDays />
              <p>
                {new Date(selectedStartTime)
                  .toLocaleDateString("es-ES", { weekday: "long" })
                  .replace(/^./, (letra) => letra.toUpperCase())}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold">
              <Calendar1 />
              <p>{new Date(selectedStartTime).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold">
              <Clock />
              <p>{new Date(selectedStartTime).toLocaleTimeString()}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold text-secondary">
              <MapPin />
              <p>
                {selectedPlace &&
                  selectedPlace.replace(/_/g, " ").charAt(0).toUpperCase() +
                    selectedPlace.replace(/_/g, " ").slice(1)}
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleAccept}>Aceptar</Button>
      </div>
    </>
  );
};

export default AppointmentConfirmationSuccess;
