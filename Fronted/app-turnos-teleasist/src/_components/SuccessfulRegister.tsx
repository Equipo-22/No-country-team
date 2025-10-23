"use client"

import ContainerMax300 from '@/components/ui/Container-max300'
import Logo from '@/components/ui/Logo'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const SuccessfulRegister = () => {

    const router = useRouter()
    return (
        <>
            <Logo />
            <Image
                src="/success.svg"
                alt="success_icon"
                width={63}
                height={63}
            />
            <ContainerMax300>
                <p className='text-center text-lg pb-4'>Tu cuenta se creó con éxito</p>
                <Button onClick={() => router.push("/login")} className=" cursor-pointer mx-4 mt-4" variant={"outline"}>Iniciar sesión</Button>
            </ContainerMax300>
        </>
    )
}

export default SuccessfulRegister
