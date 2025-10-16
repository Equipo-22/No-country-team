import WelcomePatient from '@/_components/WelcomePatient'
import React from 'react'

const page = () => {
    return (
        <div className='flex justify-center flex-col g-max-width w-full mx-auto g-height-page'>
            <WelcomePatient />
        </div>
    )
}

export default page