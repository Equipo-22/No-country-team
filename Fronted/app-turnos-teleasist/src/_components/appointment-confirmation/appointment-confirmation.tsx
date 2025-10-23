import { Button } from "@/components/ui/button";
import TitleSection from "@/components/ui/TitleSection";
import { MapPin, Hospital } from "lucide-react";

type AppointmentConfirmationProps = {
  onBack: () => void;
  onConfirm: () => void;
};

const AppointmentConfirmation = ({
  onBack,
  onConfirm,
}: AppointmentConfirmationProps) => {
  return (
    <>
    <TitleSection text="Confirma la cita que deseas agendar" />
      <div className="flex flex-col items-center justify-center gap-5 ">
        <div className="flex flex-col gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:flex-row lg:gap-72 w-full">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Viernes, 2 de noviembre</p>
            <p className="text-xl font-bold">7:50 pm</p>
            <Button variant="outline">
              <Hospital /> Presencial
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Consulta de medicina general</p>
            <p>Dr. Juan Cruz Gómez</p>
            <div className="flex items-center gap-2 text-lg font-bold text-secondary">
              <MapPin />
              <p>Sede centro</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 w-full">
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
          <Button onClick={onConfirm}>Confirmar cita</Button>
        </div>
      </div>
    </>
  );
};

export default AppointmentConfirmation;
