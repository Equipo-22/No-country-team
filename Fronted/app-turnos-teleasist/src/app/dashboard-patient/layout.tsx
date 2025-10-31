"use client"

import React, { useEffect, useState } from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from '@/_components/SideBar';
import SideBarMobile from '@/_components/SideBarMobile';
import { useUserStore } from '@/store/userStore';
import { useGetNotificationsByIdPatient } from '@/_service/use-queries-services/notification-querie-service';
import { NotificationMutationsService } from '@/_service/use-mutation-services/notification-mutation-services';


const DashboardPatient = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantityNotifications, setQuantityNotifications] = useState(0)

  const { idPatient, email, username } = useUserStore()
  const { data: notifications = [], isLoading, refetch } = useGetNotificationsByIdPatient(idPatient);
  const { mutationPostNotificationAsReaded, mutationDeleteNotificationsById } = NotificationMutationsService();

  const notReaded = notifications.filter((n) => !n.read);
  const qtyNotifications = notReaded.length;

  const handleMarkAsRead = (id: string) => {
    mutationPostNotificationAsReaded.mutate(id, {
      onSuccess: () => refetch(), // 🔁 actualiza lista después de marcar como leída
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteNotificationsById.mutate(id, {
      onSuccess: () => refetch(), 
    });
  };


  useEffect(() => {

    const notReaded = notifications.filter((notification) => notification.read === false)

    setQuantityNotifications(notReaded.length)

  }, [!idPatient, notifications])

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-[280px_1fr] bg-gray-50">

      {/* Sidebar Mobile */}
      <SideBarMobile open={isMenuOpen} setOpen={setIsMenuOpen} qtyNotifications={quantityNotifications} />

      {/* Sidebar Desktop */}
      <aside className="hidden lg:block bg-white shadow-md">
        <SideBar qtyNotifications={quantityNotifications} />
      </aside>

      <main className="flex flex-col w-full">

        <header className="w-full h-[10vh] flex items-center p-4 dashboardHeader-bg-gradient lg:border-b">
          <div className="flex justify-between items-center w-full">

            <div className="lg:hidden">
              <img src="/logo-blanco.svg" alt="logo app" className="h-10 ml-2" />
            </div>

            <div className="flex gap-2 items-center justify-end w-full">
              <IoIosNotificationsOutline className="h-auto w-7 text-white lg:text-gray-900" />

              <div className="flex justify-around">
                <img
                  className="rounded-full h-auto w-8"
                  src="/profile_1.jpg"
                  alt="imagen perfil"
                />
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-800"
              >
                <GiHamburgerMenu className="w-6 h-6 text-white" />
              </button>

              <div className="hidden lg:flex flex-col ml-2 text-sm mr-4">
                <p className="font-medium text-gray-900">{username}</p>
                <p className="text-gray-500">{email}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grow w-full p-3 md:p-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6 h-full">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPatient;
