"use client"
import { Button } from '@/components/ui/button'
import ContainerMax300 from '@/components/ui/Container-max300'
import Logo from '@/components/ui/Logo'
import TitleSection from '@/components/ui/TitleSection'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'


const WelcomePatient = () => {
    const router = useRouter()
    const data = [
        { id: 1, icon: "/calendar.svg", info: "Agendar y gestionar tus citas presenciales o virtuales con tu médico." },
        { id: 2, icon: "/notifications.svg", info: "Recibir recordatorios automáticos para no olvidar tus turnos." },
        { id: 3, icon: "/document.svg", info: "Acceder a tu historial clínico en cualquier momento." },
        { id: 4, icon: "/videocall.svg", info: "Conectarte por videollamada en tus consultas online." },
        { id: 5, icon: "/chat.svg", info: "Chatear de forma segura con tu profesional de salud" },
    ]

    return (
        <>
            <Logo />
            <ContainerMax300 >
                <TitleSection text="¡Te damos la bienvenida!" />
                <p className='py-3'>Somos un espacio digital para cuidar tu salud de forma simple, segura y conectada.</p>
                <b className='text-secondary py-2'>Con Medihub podes: </b>
                {
                    data.map(e => (
                        <section className='py-1' key={e.id}>
                            <div className='flex justify-around  gap-2  w-full' >
                                <Image
                                    src={e.icon}
                                    alt=""
                                    width={60}
                                    height={60}
                                />
                                <p className='text-sm'>{e.info}</p>
                            </div>
                        </section>
                    ))
                }
                <p className='py-4'>Nos enfocamos en brindarte una experiencia fluida, sin complicaciones y con toda la información médica al alcance de tu mano.</p>
                <p className='pb-5 font-bold'>Comenzá explorando tu panel para gestionar tu próxima cita</p>
                <Button onClick={() => router.push("/dashboard-patient/inicio")} className="">Comenzar</Button>
            </ContainerMax300>
        </>
    )
}

export default WelcomePatient