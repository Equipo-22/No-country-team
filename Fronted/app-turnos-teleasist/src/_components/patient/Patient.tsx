"use client"

import { Button } from '@/components/ui/button'
import TitleSection from '@/components/ui/TitleSection'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import React from 'react'
import AppointmentCalendar from '../AppointmentCalendar'

export const Patient = () => {

  const router = useRouter()

  const { username, idPatient } = useUserStore()

  const firstName = username
    ? username.split(" ")[0].charAt(0).toUpperCase() + username.split(" ")[0].slice(1).toLowerCase()
    : "Usuario";

  return (
    <div className='md:p-8'>
      <TitleSection text={`¡Hola ${firstName}!`} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3 md:mt-6'>
        <div className='w-full bg-accent rounded-md text-secondary p-6  lg:p-16 md:col-span-1 lg:col-span-3'>
          <p className='text-2xl md:text-3xl font-bold py-2.5'>Tu salud importa</p>
          <p className='text-lg md:text-2xl py-4'>No olvides revisar tus próximas citas.</p>
          <Button className='w-full md:w-60 lg:w-80 lg:h-12 lg:text-lg rounded text-secondary bg-white hover:bg-secondary hover:text-white p-2.5 my-4 lg:my-8 cursor-pointer'
            onClick={() => router.push("/dashboard-patient/appointment")} >Ver proximas citas</Button>
        </div>
        <AppointmentCalendar idPatient={idPatient}/>
      </div>
    </div>
  )
}
