import { Button } from "@/components/ui/button";
import TitleSection from "@/components/ui/TitleSection";
import { MapPin, Hospital } from "lucide-react";
import { useUserStore } from "@/store/userStore";

type AppointmentConfirmationProps = {
  onBack: () => void;
  onConfirm: () => void;
  selectedDoctor: any;
  selectedPlace: any;
  selectedStartTime: any;
  apptType: any;
  selectedMotivo: any;
  selectedEndTime: any;
};

const AppointmentConfirmation = ({
  onBack,
  selectedDoctor,
  selectedPlace,
  selectedStartTime,
  apptType,
  selectedMotivo,
  selectedEndTime,
  onConfirm,
}: AppointmentConfirmationProps) => {
  const idPatient = useUserStore((state) => state.idPatient);

  const handleConfirm = async () => {
    const payload = {
      patientId: idPatient,
      professionalId: selectedDoctor?.id,
      type: apptType?.toUpperCase(),
      lugar: apptType === "VIRTUAL" ? "MEET" : selectedPlace,
      motivo: selectedMotivo,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BASE}/appointment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    onConfirm();
  };
  return (
    <>
      <TitleSection text="Confirma la cita que deseas agendar" />
      <div className="flex flex-col items-center justify-center gap-5 ">
        <div className="flex flex-col gap-2 px-4 py-2 rounded-sm shadow-sm bg-white my-8 lg:px-8 lg:py-4 lg:flex-row lg:gap-72 w-full">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">
              {(() => {
                const date = new Date(selectedStartTime);
                const dayName = date.toLocaleDateString("es-ES", {
                  weekday: "long",
                });
                const formattedDay =
                  dayName.charAt(0).toUpperCase() + dayName.slice(1);
                const formattedDate = date.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                });
                return `${formattedDay}, ${formattedDate}`;
              })()}
            </p>
            <p className="text-xl font-bold">
              {new Date(selectedStartTime).toLocaleTimeString()}
            </p>
            <Button variant="outline">
              <Hospital /> {apptType?.toUpperCase()}
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">
              Consulta {selectedDoctor?.specialty}
            </p>
            <p>{selectedDoctor?.name}</p>
            {apptType !== "VIRTUAL" && (
              <div className="flex items-center gap-2 text-lg font-bold text-secondary">
                <MapPin />
                <p>
                  {selectedPlace &&
                    selectedPlace.replace(/_/g, " ").charAt(0).toUpperCase() +
                      selectedPlace.replace(/_/g, " ").slice(1)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 w-full">
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
          <Button onClick={() => handleConfirm()}>Confirmar cita</Button>
        </div>
      </div>
    </>
  );
};

export default AppointmentConfirmation;
