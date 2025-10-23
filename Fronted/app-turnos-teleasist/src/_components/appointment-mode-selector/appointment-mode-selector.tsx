import { MonitorCheck, Hospital } from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";

type AppointmentModeSelectorProps = {
  onOpenPresencial: () => void;
  onOpenVirtual: () => void;
};

const AppointmentModeSelector = ({
  onOpenPresencial,
  onOpenVirtual,
}: AppointmentModeSelectorProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <TitleSection text="¿Cómo deseas recibir tu cita?" />

        <p className="text-xl">
          <strong>Seleccioná una opción</strong>
        </p>
      </div>

      <div className="flex gap-5">
        <button
          type="button"
          className=" flex flex-col items-center gap-2 p-8 rounded-sm shadow-sm bg-white my-8 cursor-pointer w-40"
          onClick={onOpenPresencial}
        >
          <Hospital className="size-10 text-secondary" />
          <p className="text-xl font-bold">Presencial</p>
        </button>

        <button
          type="button"
          className=" flex flex-col items-center gap-2 p-8 rounded-sm shadow-sm bg-white my-8 cursor-pointer w-40"
          onClick={onOpenVirtual}
        >
          <MonitorCheck className="size-10 text-secondary" />
          <p className="text-xl font-bold">Virtual</p>
        </button>
      </div>
    </>
  );
};

export default AppointmentModeSelector;
