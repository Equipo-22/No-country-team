import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type AppointmentDateSelectionProps = {
  onNext: () => void;
};

const AppointmentDateSelection = ({
  onNext,
}: AppointmentDateSelectionProps) => {
  return (
    <div className="p-[2rem] flex flex-col">
      <h3 className="text-[2rem] text-secondary font-bold">Seleccioná tu cita médica</h3>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex gap-2 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem] lg:px-[2rem] lg:py-[1rem] lg:gap-0 lg:justify-between w-[80%]">
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

        <div className="flex flex-col gap-2 px-[1rem] py-[0.5rem] rounded-sm shadow-sm bg-white my-[2rem] lg:px-[2rem] lg:py-[1rem] lg:gap-0 lg:items-center lg:flex-row lg:justify-between w-full">
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
