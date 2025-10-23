"use client";

import { useState } from "react";

import { Navbar } from "@/_components/Navbar";
import { Button } from "@/components/ui/button";
import { CircleUser, MessagesSquare, Video } from "lucide-react";
import Modal from "@/components/ui/modal";
import NotificationsPatient from "@/_components/NotificationsPatient";

const PageNotificationsPatient = () => {
  return (
   
      <div className="flex flex-col w-full">
       
        <NotificationsPatient />
      </div>
    
  );
};

export default PageNotificationsPatient;
