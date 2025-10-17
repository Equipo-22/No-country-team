import { MonitorCheck, Hospital } from "lucide-react";

type AppointmentModeSelectorProps = {
  onOpenPresencial: () => void;
  onOpenVirtual: () => void;
};

const AppointmentModeSelector = ({
  onOpenPresencial,
  onOpenVirtual,
}: AppointmentModeSelectorProps) => {
  return (
    <div className="p-[2rem]">
      <div className="flex flex-col gap-2">
        <h3 className="text-[2rem] text-secondary font-bold">
          ¿Cómo deseas recibir tu cita?
        </h3>
        <p className="text-xl">
          <strong>Seleccioná una opción</strong>
        </p>
      </div>

      <div className="flex gap-5">
        <button
          type="button"
          className=" flex flex-col items-center gap-2 p-[2rem] rounded-sm shadow-sm bg-white my-[2rem] cursor-pointer w-40"
          onClick={onOpenPresencial}
        >
          <Hospital className="size-10 text-secondary" />
          <p className="text-xl">
            <strong>Presencial</strong>
          </p>
        </button>

        <button
          type="button"
          className=" flex flex-col items-center gap-2 p-[2rem] rounded-sm shadow-sm bg-white my-[2rem] cursor-pointer w-40"
          onClick={onOpenVirtual}
        >
          <MonitorCheck className="size-10 text-secondary" />
          <p className="text-xl">
            <strong>Virtual</strong>
          </p>
        </button>
      </div>
    </div>
  );
};

export default AppointmentModeSelector;
