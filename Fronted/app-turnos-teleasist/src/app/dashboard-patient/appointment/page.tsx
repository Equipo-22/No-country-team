"use client";

import { useState } from "react";
import { DashboardPatient } from "@/_components/layouts/DashboardPatient";
import { Navbar } from "@/_components/Navbar";
import { Button } from "@/components/ui/button";
import { CircleUser, MessagesSquare, Video } from "lucide-react";
import Modal from "@/components/ui/modal";
import AppointmentItem from "@/_components/appointment-item/appointment-item";

const AppointmentPatient = () => {
  const [openUpcomingModal, setOpenUpcomingModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);

  return (
    <DashboardPatient>
      <div className="flex flex-col w-full">
        <Navbar />
        <AppointmentItem
          onOpenUpcoming={() => setOpenUpcomingModal(true)}
          onOpenHistory={() => setOpenHistoryModal(true)}
        />
      </div>
      <Modal
        isOpen={openUpcomingModal}
        onClose={() => setOpenUpcomingModal(false)}
        title="Detalle de la cita"
      >
        <AppointmentDetail showActions />
      </Modal>

      <Modal
        isOpen={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
        title="Detalle de la cita"
      >
        <AppointmentDetail />
      </Modal>
    </DashboardPatient>
  );
};

const AppointmentDetail = ({ showActions }: { showActions?: boolean }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <CircleUser className="text-gray-500" />
        </div>
        <div>
          <p className="font-medium text-gray-800">Juan Cruz Gómez</p>
          <p className="text-sm text-gray-500">Médico general</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="text-secondary border-secondary cursor-pointer"
        >
          Ver perfil
        </Button>
        <Button
          variant="outline"
          className="text-secondary border-secondary cursor-pointer"
        >
          <MessagesSquare />
        </Button>
        <Button
          variant="outline"
          className="text-secondary border-secondary cursor-pointer"
        >
          <Video />
        </Button>
      </div>
    </div>

    <div className="flex flex-col gap-2 text-sm text-gray-700">
      <p>
        <strong>Modalidad:</strong>
        <span>Presencial</span>
      </p>
      <p>
        <strong>Lugar:</strong> Sede centro
      </p>
      <p>
        <strong>Dirección:</strong> Av. 9 de Julio 2345
      </p>
      <p>
        <strong>Día:</strong>
        <span>Viernes</span>
      </p>
      <p>
        <strong>Fecha:</strong> 02/11/25
      </p>
      <p>
        <strong>Hora:</strong> 07:50hs
      </p>
    </div>

    {showActions && (
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button>Reprogramar cita</Button>
        <Button variant="outline">Cancelar cita</Button>
      </div>
    )}
  </div>
);

export default AppointmentPatient;
