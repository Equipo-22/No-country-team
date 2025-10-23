import { Button } from '@/components/ui/button'
import TitleSection from '@/components/ui/TitleSection'
import React from 'react'
import MedicalRecordItem from './MedicalRecordItem'

const appointment = {
    username: "Sofía Garciarena",
    genero: "Femenino",
    fecha_nacimiento: "15/10/1988",
    edad: "30",
    email: "sofia@gmail.com",
    telefono: "+5492613331111",
    direccion: "Av. Corrientes 1234",
    cobertura: "obra_social",
    obra_social: "Swiss Medical",
    nro_afiliado: "123456789",
    password: "*********"
}

const MedicalRecord = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-[auto_minmax(0,200px)] grid-rows-[1fr, auto-rows-min, 1fr] md:grid-rows-[auto_auto]'>
                <TitleSection text="Historia clínica" />
                <section className='bg-background w-full h-min rounded-md md:order-3 md:col-span-2 p-3.5 md:py-6 md:px-16  mt-2 shadow-md shadow-muted'>
                    <article className="grid grid-cols-4 grid-row-4 gap-2 py-3 border-b">
                        <p className='text-secondary font-bold py-2 col-span-4'>Información general</p>
                        <div className='col-span-4 md:col-span-2 text-sm'>
                            <div className='grid grid-cols-2 gap-3 my-4'>
                                <p >Última cita médica:</p>
                                <p >09/10/25</p>
                                <p >Última actualización de historia clínica:</p>
                                <p >15/10/2025</p>
                            </div>
                        </div>
                    </article>
                    <article className="grid grid-cols-4 gap-2 py-3">
                        <p className="text-secondary font-bold py-2 col-span-4">Actualizaciones</p>
                        <MedicalRecordItem />
                        <MedicalRecordItem />
                        <MedicalRecordItem />
                    </article>
                </section>
            </div>
        </>
    )
}

export default MedicalRecord
