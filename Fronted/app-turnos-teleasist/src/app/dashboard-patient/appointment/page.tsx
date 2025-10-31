"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleUser, MessagesSquare, Video } from "lucide-react";
import Modal from "@/components/ui/modal";
import AppointmentItem from "@/_components/appointment-item/appointment-item";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const getDoctors = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BASE}/doctor/doctor?page=0&size=100`
  );
  const data = await response.json();
  return data;
};

const getAppointmentsByIdPatient = async (idPatient: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BASE}/appointment/patient/${idPatient}`
  );
  const data = await response.json();
  return data;
};

// const cancelAppointment = async (idAppointment: string) => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_URL_BASE}/appointment/${idAppointment}`,
//     {
//       method: "DELETE",
//     }
//   );
//   const data = await response.json();
//   return data;
// };

const AppointmentPatient = () => {
  const [openUpcomingModal, setOpenUpcomingModal] = useState<string | null>(null);
  const [openHistoryModal, setOpenHistoryModal] = useState<string | null>(null);

  const [doctors, setDoctors] = useState<any>([]);
  const [appointments, setAppointments] = useState<any>([]);

  const { idPatient } = useUserStore();

  useEffect(() => {
    if (!idPatient) return;

    getAppointmentsByIdPatient(idPatient).then((data) => {
      setAppointments(data);
    });

    getDoctors().then((data) => {
      setDoctors(data);
    });
  }, [idPatient]);

  return (
    <>
      <div className="flex flex-col w-full">
        <AppointmentItem
          onOpenUpcoming={(id) => setOpenUpcomingModal(id)}
          onOpenHistory={(id) => setOpenHistoryModal(id)}
          doctors={doctors}
          appointments={appointments}
        />
      </div>
      <Modal
        isOpen={openUpcomingModal !== null}
        onClose={() => setOpenUpcomingModal(null)}
        title="Detalle de la cita"
      >
        <AppointmentDetail
          showActions
          appointment={appointments.find(
            (appointment: any) => appointment.id === openUpcomingModal
          )}
          doctors={doctors}
          onClose={() => setOpenUpcomingModal(null)}
        />
      </Modal>

      <Modal
        isOpen={openHistoryModal !== null}
        onClose={() => setOpenHistoryModal(null)}
        title="Detalle de la cita"
      >
        <AppointmentDetail
          appointment={appointments.find(
            (appointment: any) => appointment.id === openHistoryModal
          )}
          doctors={doctors}
        />
      </Modal>
    </>
  );
};

const AppointmentDetail = ({
  showActions,
  appointment,
  doctors,
  onClose,
}: {
  showActions?: boolean;
  appointment: any;
  doctors: any;
  onClose?: () => void;
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <CircleUser className="text-gray-500" />
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {
                doctors?.content?.find(
                  (doctor: any) => doctor.id === appointment?.professionalId
                )?.name
              }
            </p>
            <p className="text-sm text-gray-500">
              {
                doctors?.content?.find(
                  (doctor: any) => doctor.id === appointment?.professionalId
                )?.specialty
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {appointment?.type === "VIRTUAL" && (
            <Button
              variant="outline"
              className="text-secondary border-secondary cursor-pointer"
            >
              <Link href={appointment?.meetingUrl} target="_blank">
                <Video className="text-secondary" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <p>
          <strong>Modalidad:</strong>
          <span> {appointment?.type}</span>
        </p>
        <p>
          <strong>Lugar:</strong> {appointment?.lugar}
        </p>
        <p>
          <strong>Día: </strong>
          {new Date(appointment?.startTime)
            .toLocaleDateString("es-ES", { weekday: "long" })
            .replace(/^\w/, (c) => c.toUpperCase())}
        </p>
        <p>
          <strong>Fecha:</strong>{" "}
          {new Date(appointment?.startTime).toLocaleDateString()}
        </p>
        <p>
          <strong>Hora:</strong>{" "}
          {new Date(appointment?.startTime).toLocaleTimeString()}
        </p>
      </div>

      {showActions && (
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="default"
            onClick={() => onClose?.()}
            className="cursor-pointer"
          >
            Cerrar
          </Button>
        </div>
      )}
    </>
  );
};

export default AppointmentPatient;
