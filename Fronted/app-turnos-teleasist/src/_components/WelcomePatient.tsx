"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const WelcomePatient = () => {
    const router = useRouter()
    const data = [
        { id: 1, info: "Agendar y gestionar tus citas presenciales o virtuales con tu médico." },
        { id: 2, info: "Recibir recordatorios automáticos para no olvidar tus turnos." },
        { id: 3, info: "Acceder a tu historial clínico en cualquier momento." },
        { id: 4, info: "Conectarte por videollamada en tus consultas online." },
        { id: 5, info: "Chatear de forma segura con tu profesional de salud" },
    ]

    return (
        <div className='max-w-[400px] '>
            <h2 className='text-[#000] text-[2rem] p-[1rem]'>!Te damos la bienvenida¡</h2>
            <p className='p-[1rem]'>Somos un espacio digital para cuidar tu salud de forma simple, segura y conectada.</p>
            <b className='text-[#9d9b9b] p-[1rem]'>Con Medihub podes: </b>
            {
                data.map(e => (
                    <section className='p-[1rem]' key={e.id}>
                        <div className='flex justify-around  gap-4  w-full' >
                            <p className='bg-[#d9d9d9] rounded-full min-h-[3rem] min-w-[3rem]'></p>
                            <b>{e.info}</b>
                        </div>
                    </section>
                ))
            }
            <p className='p-[1rem]'>Nos enfocamos en brindarte una experiencia fluida, sin complicaciones y con toda la información médica al alcance de tu mano.</p>
            <p className='p-[1rem] font-bold'>Comenzá explorando tu panel para gestionar tu próxima cita</p>
            <Button onClick={() => router.push("/dashboard-patient/inicio")} className="bg-[#6C757D] p-[2rem] cursor-pointer w-full">Comenzar</Button>
        </div>
    )
}

export default WelcomePatient