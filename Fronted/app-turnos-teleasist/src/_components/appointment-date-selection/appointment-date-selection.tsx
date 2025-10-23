import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";

type AppointmentDateSelectionProps = {
  onNext: () => void;
};

const AppointmentDateSelection = ({
  onNext,
}: AppointmentDateSelectionProps) => {
  return (
    <div className="flex flex-col">
      <TitleSection text="Seleccioná tu cita médica" />

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:gap-0 lg:justify-between w-[80%]">
          <button type="button" className="cursor-pointer">
            <ChevronLeft />
          </button>
          <button type="button" className="cursor-pointer">
            <p>Lun</p>
            <p className="text-2xl text-secondary font-bold">9</p>
          </button>

          <button type="button" className="cursor-pointer">
            <p>Lun</p>
            <p className="text-2xl text-secondary font-bold">9</p>
          </button>

          <button type="button" className="cursor-pointer">
            <p>Lun</p>
            <p className="text-2xl text-secondary font-bold">9</p>
          </button>
          <button type="button" className="cursor-pointer">
            <ChevronRight />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:gap-0 lg:items-center lg:flex-row lg:justify-between w-full">
          <div className="flex gap-10">
            <p className="text-2xl text-secondary font-bold">7:50 pm</p>
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Consulta de medicina general</p>
              <p>Dr. Juan Cruz Gómez</p>
              <p>Traumatología</p>
            </div>
          </div>
          <Button onClick={onNext}>Agendar cita</Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDateSelection;
