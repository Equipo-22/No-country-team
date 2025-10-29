import { Button } from "@/components/ui/button";
import { CirclePlus, ChevronRight, CircleUser } from "lucide-react";
import TitleSection from "@/components/ui/TitleSection";
import { useRouter } from "next/navigation";

type AppointmentItemProps = {
  onOpenUpcoming: () => void;
  onOpenHistory: () => void;
};

const AppointmentItem = ({
  onOpenUpcoming,
  onOpenHistory,
}: AppointmentItemProps) => {

  const router = useRouter()

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <Button onClick={() => router.push("/dashboard-patient/appointment/create")} className="w-full lg:w-[200px] lg:order-2 my-6">
          <CirclePlus /> Nueva cita
        </Button>
        <TitleSection text="Próximas citas" />
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
        <button
          type="button"
          className="cursor-pointer"
          onClick={onOpenUpcoming}
        >
          <ChevronRight />
        </button>
      </div>

      <TitleSection text="Historial de citas" />

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
        <button
          type="button"
          className="cursor-pointer"
          onClick={onOpenHistory}
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
};

export default AppointmentItem;
