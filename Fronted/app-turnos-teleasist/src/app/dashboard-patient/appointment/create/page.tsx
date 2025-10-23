"use client";

import { useState } from "react";
import { Navbar } from "@/_components/Navbar";
import { Button } from "@/components/ui/button";
import { CircleUser, CalendarDays } from "lucide-react";
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
};

const AppointmentCreate = () => {
  const [openPresencialModal, setOpenPresencialModal] = useState(false);
  const [openVirtualModal, setOpenVirtualModal] = useState(false);
  const [step, setStep] = useState<
    "mode" | "date" | "confirmation" | "success"
  >("mode");

  const goToDateSelection = () => {
    setStep("date");
    setOpenPresencialModal(false);
    setOpenVirtualModal(false);
  };

  const goToConfirmation = () => setStep("confirmation");

  const goToSuccess = () => setStep("success");

  return (
      <div>

        <div className="flex flex-col w-full">

          {step === "mode" && (
            <AppointmentModeSelector
              onOpenPresencial={() => setOpenPresencialModal(true)}
              onOpenVirtual={() => setOpenVirtualModal(true)}
            />
          )}
          {step === "date" && (
            <AppointmentDateSelection onNext={goToConfirmation} />
          )}
          {step === "confirmation" && (
            <AppointmentConfirmation
              onBack={goToDateSelection}
              onConfirm={goToSuccess}
            />
          )}
          {step === "success" && <AppointmentConfirmationSuccess />}
        </div>

        <AppointmentModal
          isOpen={openPresencialModal}
          onClose={() => setOpenPresencialModal(false)}
          isVirtual={false}
          onNext={goToDateSelection}
        />

        <AppointmentModal
          isOpen={openVirtualModal}
          onClose={() => setOpenVirtualModal(false)}
          isVirtual={true}
          onNext={goToDateSelection}
        />
      </div>
  );
};

const AppointmentModal = ({
  isOpen,
  onClose,
  isVirtual,
  onNext,
}: AppointmentModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría<span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            onChange={onClose}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          >
            <option value="">Seleccionar categoría</option>
            <option value="general">Medicina General</option>
            <option value="odontologia">Odontología</option>
            <option value="pediatria">Pediatría</option>
          </select>
        </div>

        {!isVirtual && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lugar<span className="text-red-500">*</span>
            </label>
            <select
              name="place"
              onChange={onClose}
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
            name="doctor"
            onChange={onClose}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          >
            <option value="">Seleccionar médico</option>
            <option value="juan_perez">Dr. Juan Pérez</option>
            <option value="ana_gomez">Dra. Ana Gómez</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={onNext}>
            <CalendarDays className="mr-2" />
            Ver días y horarios disponibles
          </Button>
          <Button variant="outline">
            <CircleUser className="mr-2" />
            Ver perfil del médico
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentCreate;
