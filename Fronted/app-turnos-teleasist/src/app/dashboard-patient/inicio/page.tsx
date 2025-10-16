"use client"
import { DashboardPatient } from '@/_components/layouts/DashboardPatient'
import { Patient } from '@/_components/patient/Patient'
import { Calendar } from '@/components/ui/calendar'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'

const page = () => {

  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <DashboardPatient>
      <div className='flex flex-col w-full'>

        <nav className='flex w-full h-[10vh]  items-center bg-[#fff] p-[1rem] '>
          <div className='flex gap-2 items-center w-full justify-end'>
            <IoIosNotificationsOutline className='h-auto w-[2rem]' />
            <div className='flex justify-around'>
              <img className='rounded-full h-auto w-[30px]'
                src={"/person.png"}
                alt={"imagen"} />
            </div>
            <div className='flex flex-col'>
              <p>nombre</p>
              <p>mail</p>
            </div>
          </div>
        </nav>
        <section className=' mx-auto pt-[3rem]'>
          <h2 className='text-[3rem] text-[#0C4E8C] p-[1rem]'>¡Hola Usuario!</h2>
          <div className='grid grid-cols-3 gap-[2rem] '>
            <Patient />
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />

          </div>
        </section>
      </div>
    </DashboardPatient>
  )
}
export default page