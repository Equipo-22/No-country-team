"use client"

import { Calendar } from '@/components/ui/calendar'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const Patient = () => {

  const router = useRouter()
const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <section className=' mx-auto pt-[3rem]'>
      <h2 className='text-[3rem] text-[#0C4E8C] p-[1rem]'>¡Hola Usuario!</h2>
      <div className='grid grid-cols-3 gap-[2rem] '>
        <div className='min-h-[30vh] content-center mx-auto col-span-2 w-full '>
          <div className='bg-[#11C4D4] w-full p-[3rem] rounded-3xl h-full'>
            <b className='text-[#0C4E8C] py-[1rem]'>Tu salud importa</b>
            <p className='text-[#0e65b7] py-[1rem]'>No olvides revisar tus próximas citas.</p>
            <button className='rounded-[5px] bg-[#fff] hover:bg-[#f3f3f3] p-[10px] cursor-pointer'
              onClick={() => router.push("")} >ver tus proximas citas</button>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm"
          captionLayout="dropdown"
        />

      </div>
    </section>
  )
}
