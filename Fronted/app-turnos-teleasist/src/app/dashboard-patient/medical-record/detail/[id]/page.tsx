import MedicalRecordDetail from '@/_components/patient/MedicalRecordDetail'
import React from 'react'

const page = ({ params }: { params: { id: string } }) =>  {
  return (
    <div>
      <MedicalRecordDetail /* id={params.id} */ />
    </div>
  )
}

export default page
