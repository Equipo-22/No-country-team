import { Button } from "@/components/ui/button";
import { CirclePlus, ChevronRight, CircleUser } from "lucide-react";

type AppointmentItemProps = {
  onOpenUpcoming: () => void;
  onOpenHistory: () => void;
};

const AppointmentItem = ({ onOpenUpcoming, onOpenHistory }: AppointmentItemProps) => {

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-[2rem] text-secondary font-bold">Próximas citas</h3>
        <a href="/dashboard-patient/appointment/create">
        <Button >
          <CirclePlus /> Nueva cita
        </Button>
        </a>
      </div>

      <div className="flex flex-col gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:gap-0 lg:items-center lg:flex-row lg:justify-between">
        <div className="flex items-center gap-2 lg:items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <CircleUser className="text-gray-500" />
          </div>
          <p>
            <strong>Juan Cruz Gómez </strong>
          </p>
        </div>
        <p>Traumatología</p>
        <p>02/11/25</p>
        <p>09:30hs</p>
        <Button variant="outline">Cita confirmada</Button>
        <Button variant="outline">Presencial</Button>
        <button type="button" className="cursor-pointer" onClick={onOpenUpcoming}>
          <ChevronRight />
        </button>
      </div>

      <h3 className="text-[2rem] text-secondary font-bold">Historial de citas</h3>

      <div className="flex flex-col gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:gap-0 lg:items-center lg:flex-row lg:justify-between">
        <div className="flex items-center gap-2 lg:items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <CircleUser className="text-gray-500" />
          </div>
          <p>
            <strong>Juan Cruz Gómez </strong>
          </p>
        </div>
        <p>Traumatología</p>
        <p>02/11/25</p>
        <p>09:30hs</p>
        <Button variant="outline">Cita confirmada</Button>
        <Button variant="outline">Presencial</Button>
        <button type="button" className="cursor-pointer" onClick={onOpenHistory}>
          <ChevronRight />
        </button>
      </div>
    </>
  );
};

export default AppointmentItem;
