"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Modal from "@/components/ui/modal";
import AppointmentModeSelector from "@/_components/appointment-mode-selector/appointment-mode-selector";
import AppointmentDateSelection from "@/_components/appointment-date-selection/appointment-date-selection";
import AppointmentConfirmation from "@/_components/appointment-confirmation/appointment-confirmation";
import AppointmentConfirmationSuccess from "@/_components/appointment-confirmation-success/appointment-confirmation-success";

type AppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isVirtual: boolean;
  onNext: () => void;
  doctors: {
    content: any[];
  };
  setSelectedCategory: (category: string) => void;
  setSelectedPlace: (place: string) => void;
  setSelectedDoctor: (doctor: string) => void;
  selectedCategory: string;
  selectedPlace: string;
  selectedDoctor: string;
  selectedMotivo: string;
  setSelectedMotivo: (motivo: string) => void;
};

const getDoctors = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BASE}/doctor/doctor?page=0&size=100`
  );
  const data = await response.json();
  return data;
};

const AppointmentCreate = () => {
  const [openPresencialModal, setOpenPresencialModal] = useState(false);
  const [openVirtualModal, setOpenVirtualModal] = useState(false);
  const [step, setStep] = useState<
    "mode" | "date" | "confirmation" | "success"
  >("mode");
  const [doctors, setDoctors] = useState<any>([]);
  const [apptType, setApptType] = useState<"VIRTUAL" | "PRESENCIAL" | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [selectedMotivo, setSelectedMotivo] = useState<any>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<any>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<any>(null);

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data);
    });
  }, []);

  const goToDateSelection = () => {
    setStep("date");
    setOpenPresencialModal(false);
    setOpenVirtualModal(false);
  };

  const goToConfirmation = () => setStep("confirmation");

  const goToSuccess = () => setStep("success");

  return (
    <>
      <div className="flex flex-col w-full">
        {step === "mode" && (
          <AppointmentModeSelector
            onOpenPresencial={() => {
              setOpenPresencialModal(true);
              setApptType("PRESENCIAL");
            }}
            onOpenVirtual={() => {
              setOpenVirtualModal(true);
              setApptType("VIRTUAL");
            }}
          />
        )}
        {step === "date" && (
          <AppointmentDateSelection
            onNext={goToConfirmation}
            selectedDoctor={doctors?.content?.find(
              (doctor: any) => doctor.id === selectedDoctor
            )}
            setSelectedStartTime={setSelectedStartTime}
            setSelectedEndTime={setSelectedEndTime}
          />
        )}
        {step === "confirmation" && (
          <AppointmentConfirmation
            onBack={goToDateSelection}
            onConfirm={goToSuccess}
            selectedDoctor={doctors?.content?.find(
              (doctor: any) => doctor.id === selectedDoctor
            )}
            selectedPlace={selectedPlace}
            selectedStartTime={selectedStartTime}
            apptType={apptType}
            selectedMotivo={selectedMotivo}
            selectedEndTime={selectedEndTime}
          />
        )}
        {step === "success" && (
          <AppointmentConfirmationSuccess
            selectedDoctor={doctors?.content?.find(
              (doctor: any) => doctor.id === selectedDoctor
            )}
            selectedPlace={selectedPlace}
            selectedStartTime={selectedStartTime}
            apptType={apptType}
          />
        )}
      </div>

      <AppointmentModal
        isOpen={openPresencialModal}
        onClose={() => setOpenPresencialModal(false)}
        isVirtual={false}
        onNext={goToDateSelection}
        doctors={doctors}
        setSelectedCategory={setSelectedCategory}
        setSelectedPlace={setSelectedPlace}
        setSelectedDoctor={setSelectedDoctor}
        selectedCategory={selectedCategory}
        selectedPlace={selectedPlace}
        selectedDoctor={selectedDoctor}
        selectedMotivo={selectedMotivo}
        setSelectedMotivo={setSelectedMotivo}
      />

      <AppointmentModal
        isOpen={openVirtualModal}
        onClose={() => setOpenVirtualModal(false)}
        isVirtual={true}
        onNext={goToDateSelection}
        doctors={doctors}
        setSelectedCategory={setSelectedCategory}
        setSelectedPlace={setSelectedPlace}
        setSelectedDoctor={setSelectedDoctor}
        selectedCategory={selectedCategory}
        selectedPlace={selectedPlace}
        selectedDoctor={selectedDoctor}
        selectedMotivo={selectedMotivo}
        setSelectedMotivo={setSelectedMotivo}
      />
    </>
  );
};

const AppointmentModal = ({
  isOpen,
  isVirtual,
  doctors,
  setSelectedCategory,
  setSelectedPlace,
  setSelectedDoctor,
  selectedCategory,
  selectedPlace,
  selectedDoctor,
  onNext,
  onClose,
  selectedMotivo,
  setSelectedMotivo,
}: AppointmentModalProps) => {
  console.log("doctors", doctors);

  const handleNext = () => {
    if (
      selectedCategory === "Seleccionar categoría" ||
      selectedCategory === "" ||
      selectedCategory === null
    ) {
      alert("Por favor selecciona una categoría.");
      return;
    }
    if (!isVirtual && !selectedPlace) {
      alert("Por favor selecciona un lugar.");
      return;
    }
    if (
      selectedDoctor === "Seleccionar médico" ||
      selectedDoctor === "" ||
      selectedDoctor === null
    ) {
      alert("Por favor selecciona un médico.");
      return;
    }
    if (
      selectedMotivo === "Seleccionar motivo" ||
      selectedMotivo === "" ||
      selectedMotivo === null
    ) {
      alert("Por favor selecciona un motivo.");
      return;
    }
    onNext();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría<span className="text-red-500">*</span>
          </label>
          <select
            required
            name="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          >
            <option value="">Seleccionar categoría</option>
            {doctors?.content?.map((doctor: any) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        {!isVirtual && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lugar<span className="text-red-500">*</span>
            </label>
            <select
              required
              name="place"
              onChange={(e) => setSelectedPlace(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="">Seleccionar lugar</option>
              <option value="clinica_central">Clínica Central</option>
              <option value="centro_salud">Centro de Salud</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Médico<span className="text-red-500">*</span>
          </label>
          <select
            required
            name="doctor"
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          >
            <option value="">Seleccionar médico</option>
            {doctors?.content?.map((doctor: any) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motivo<span className="text-red-500">*</span>
          </label>

          <textarea
            required
            name="motivo"
            onChange={(e) => setSelectedMotivo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={handleNext}>
            <CalendarDays className="mr-2" />
            Ver días y horarios disponibles
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentCreate;
