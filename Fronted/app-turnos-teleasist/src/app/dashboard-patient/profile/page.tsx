import { DashboardPatient } from '@/_components/layouts/DashboardPatient'
import { Navbar } from '@/_components/Navbar'
import Profile from '@/_components/patient/Profile'
import React from 'react'

const page = () => {
  return (
    <DashboardPatient>
      <div className="flex flex-col w-full">
        <Navbar />
        <Profile />
      </div>
    </DashboardPatient>
  )
}

export default page
