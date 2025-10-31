import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";

type AppointmentDateSelectionProps = {
  onNext: () => void;
  selectedDoctor: any;
  setSelectedStartTime: (startTime: string) => void;
  setSelectedEndTime: (endTime: string) => void;
};

const availability = [
  {
    id: 1,
    startTime: "2025-10-31T04:00:00.000Z",
    endTime: "2025-10-31T04:20:00.000Z",
  },
  {
    id: 2,
    startTime: "2025-10-31T04:20:00.000Z",
    endTime: "2025-10-31T04:40:00.000Z",
  },
  {
    id: 3,
    startTime: "2025-10-31T04:40:00.000Z",
    endTime: "2025-10-31T05:00:00.000Z",
  },
  {
    id: 4,
    startTime: "2025-10-31T05:00:00.000Z",
    endTime: "2025-10-31T05:20:00.000Z",
  },
  {
    id: 5,
    startTime: "2025-10-31T05:20:00.000Z",
    endTime: "2025-10-31T05:40:00.000Z",
  },
  {
    id: 6,
    startTime: "2025-10-31T05:40:00.000Z",
    endTime: "2025-10-31T06:00:00.000Z",
  },
  {
    id: 7,
    startTime: "2025-10-31T06:00:00.000Z",
    endTime: "2025-10-31T06:20:00.000Z",
  },
  {
    id: 8,
    startTime: "2025-10-31T06:20:00.000Z",
    endTime: "2025-10-31T06:40:00.000Z",
  },
  {
    id: 9,
    startTime: "2025-10-31T06:40:00.000Z",
    endTime: "2025-10-31T07:00:00.000Z",
  },
  {
    id: 10,
    startTime: "2025-10-31T07:00:00.000Z",
    endTime: "2025-10-31T07:20:00.000Z",
  },
];

const AppointmentDateSelection = ({
  onNext,
  selectedDoctor,
  setSelectedStartTime,
  setSelectedEndTime,
}: AppointmentDateSelectionProps) => {


  return (
    <div className="flex flex-col">
      <TitleSection text="Seleccioná tu cita médica" />

      <div className="flex flex-col items-center justify-center w-full">
        {/* <div className="flex gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:gap-0 lg:justify-between w-[80%]">
          <button type="button" className="cursor-pointer">
            <ChevronLeft />
          </button>

          <button type="button" className="cursor-pointer">
            <p>lun</p>
            <p className="text-2xl text-secondary font-bold">9</p>
          </button>

          <button type="button" className="cursor-pointer">
            <ChevronRight />
          </button>
        </div> */}

        {availability.map((item) => (
          <div className="flex flex-col gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:gap-0 lg:items-center lg:flex-row lg:justify-between w-full">
            <div className="flex gap-10">
              <p className="text-2xl text-secondary font-bold">
                {new Date(item.startTime).toLocaleTimeString()}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold">Consulta</p>
                <p>{selectedDoctor?.name}</p>
                <p>{selectedDoctor?.specialty}</p>
              </div>
            </div>

            <Button onClick={() => {
              setSelectedStartTime(item.startTime);
              setSelectedEndTime(item.endTime);
              onNext();
            }}>Agendar cita</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentDateSelection;
