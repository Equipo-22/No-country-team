import { Button } from "@/components/ui/button";
import TitleSection from "@/components/ui/TitleSection";

type AppointmentDateSelectionProps = {
  onNext: () => void;
  selectedDoctor: any;
  setSelectedStartTime: (startTime: string) => void;
  setSelectedEndTime: (endTime: string) => void;
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const baseDate = tomorrow.toISOString().split("T")[0]; // ejemplo: "2025-11-01"

const availability = Array.from({ length: 10 }, (_, i) => {
  const start = new Date(`${baseDate}T11:00:00.000Z`);
  start.setMinutes(start.getMinutes() + i * 20);

  const end = new Date(start);
  end.setMinutes(start.getMinutes() + 20);

  return {
    id: i + 1,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  };
});

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
                {new Date(item.startTime).toLocaleDateString("es-ES")}
                <br />
                {(() => {
                  return new Date(item.startTime).toLocaleTimeString();
                })()}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold">Consulta</p>
                <p>{selectedDoctor?.name}</p>
                <p>{selectedDoctor?.specialty}</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setSelectedStartTime(item.startTime);
                setSelectedEndTime(item.endTime);
                onNext();
              }}
            >
              Agendar cita
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentDateSelection;
