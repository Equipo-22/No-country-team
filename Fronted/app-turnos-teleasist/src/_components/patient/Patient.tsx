"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export const Patient = () => {

  const router = useRouter()

  return (
    <div className='min-h-[30vh] content-center mx-auto col-span-2 w-full '>
      
      <div className='bg-[#11C4D4] w-full p-[3rem] rounded-3xl h-full'>
        <b className='text-[#0C4E8C] py-[1rem]'>Tu salud importa</b>
        <p className='text-[#0e65b7] py-[1rem]'>No olvides revisar tus próximas citas.</p>
        <button className='rounded-[5px] bg-[#fff] hover:bg-[#f3f3f3] p-[10px] cursor-pointer' onClick={() => router.push("")} >ver tus proximas citas</button>

      </div>
    </div>
  )
}
