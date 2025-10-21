"use client";

import { useState } from "react";
import { DashboardPatient } from "@/_components/layouts/DashboardPatient";
import { Navbar } from "@/_components/Navbar";
import { Button } from "@/components/ui/button";
import { CircleUser, MessagesSquare, Video } from "lucide-react";
import Modal from "@/components/ui/modal";
import NotificationsPatient from "@/_components/NotificationsPatient";

const PageNotificationsPatient = () => {
  return (
    <DashboardPatient>
      <div className="flex flex-col w-full">
        <Navbar />
        <NotificationsPatient />
      </div>
    </DashboardPatient>
  );
};

export default PageNotificationsPatient;
