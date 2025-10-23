"use client"
import { Navbar } from '@/_components/Navbar'
import { Patient } from '@/_components/patient/Patient'
import { Calendar } from '@/components/ui/calendar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'

const page = () => {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const router = useRouter()
  return (
   
      <div className='flex flex-col w-full'>
       
        
        <Patient />
      </div>
  )
}
export default page