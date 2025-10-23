import { DashboardPatient } from '@/_components/layouts/DashboardPatient'
import { Navbar } from '@/_components/Navbar'
import MedicalRecord from '@/_components/patient/MedicalRecord'

import React from 'react'

const page = () => {
  return (
    <DashboardPatient>
      <div className="flex flex-col w-full">
        <Navbar />
        <MedicalRecord />
      </div>
    </DashboardPatient>
  )
}

export default page