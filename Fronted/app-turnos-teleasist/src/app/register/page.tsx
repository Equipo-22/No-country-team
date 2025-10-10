import { RegisterForm } from '@/_components/Register'
import React from 'react'

export  function page() {
    return (
        <div className="flex justify-center flex-col g-max-width w-full mx-auto g-height-page">
            <RegisterForm />
        </div>
    )
}
