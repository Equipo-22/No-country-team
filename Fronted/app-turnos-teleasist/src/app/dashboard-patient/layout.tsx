"use client"

import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { usePathname } from 'next/navigation';
import SideBar from '@/_components/SideBar';
const DashboardPatient = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname()
  console.log(path)

  // grid grid-cols-[300px_1fr]
  return (
    <div className=' grid grid-cols-[300px_1fr] '>
      <SideBar />

      <main className='min-h-dvh w-full'>

        <header className='flex w-full h-[10vh]   items-center bg-[#fff] p-[1rem] '>
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
        </header>
        <div className=''>
          <section className='w-full min-h-[calc(100vh-100px)]  p-5'>
            <div className='w-full h-fit  rounded-lg  p-5'>
              {children}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
export default DashboardPatient