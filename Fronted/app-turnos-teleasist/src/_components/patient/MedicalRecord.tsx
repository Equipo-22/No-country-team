import TitleSection from '@/components/ui/TitleSection'
import React from 'react'
import MedicalRecordItem from './MedicalRecordItem'

const records = [
    {
        id: "1",
        professional: "Dr. Juan Cruz Gómez",
        specialty: "Medicina clínica",
        date: "09/10/25",
        time: "08:00hs",
        subject: "Dolor de cabeza persistente, especialmente en las tardes, acompañado de tensión en el cuello y fatiga visual.",
        diagnosis: "Migraña tensional leve. No se detectan signos de patología neurológica aguda. Posible relación con estrés laboral y malas posturas frente al ordenador.",
        treatments: ["Ibuprofeno 400mg. cada 8horas durante 3 días.", "Aplicar calor local en zona cervical 2 veces al día.", "Realizar ejercicios de estiramiento de cuello y hombro (5 minutos diarios).", "Reducir consumo de cafeína y mantener hidratación adecuada."],
        medicalStudies: ["Análisis de sangre general (hemograma completo).", "Control oftalmológico para descartar fatiga visual."
        ],
        observations: ["Se recomienda descanso visual cada 45 minutos frente a pantallas.", "Agendar control dentro de 15 días o antes si los síntomas empeoran."]

    },
    {
        id: "2",
        professional: "Dra. María Julieta Muñoz",
        specialty: "Ginecología",
        date: "18/10/25",
        time: "10:00hs",
        subject: "Dolor de cabeza persistente, especialmente en las tardes, acompañado de tensión en el cuello y fatiga visual.",
        diagnosis: "Migraña tensional leve. No se detectan signos de patología neurológica aguda. Posible relación con estrés laboral y malas posturas frente al ordenador.",
        treatments: ["Ibuprofeno 400mg. cada 8horas durante 3 días.", "Aplicar calor local en zona cervical 2 veces al día.", "Realizar ejercicios de estiramiento de cuello y hombro (5 minutos diarios).", "Reducir consumo de cafeína y mantener hidratación adecuada."],
        medicalStudies: ["Análisis de sangre general (hemograma completo).", "Control oftalmológico para descartar fatiga visual."
        ],
        observations: ["Se recomienda descanso visual cada 45 minutos frente a pantallas.", "Agendar control dentro de 15 días o antes si los síntomas empeoran."]

    },

]

const MedicalRecord = () => {
    return (
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
                    {records.map(record =>
                        <MedicalRecordItem key={record.id} data={record} />
                    )}                  
                </article>
            </section>
        </div>
    )
}

export default MedicalRecord
