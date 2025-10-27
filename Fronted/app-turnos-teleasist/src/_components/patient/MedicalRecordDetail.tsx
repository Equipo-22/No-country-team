"use client"
import TitleSection from '@/components/ui/TitleSection'
import Link from 'next/link';
import React from 'react'
import { SlNotebook } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { CircleUser } from 'lucide-react';
import { GrDocumentPdf } from "react-icons/gr";
import { LuDownload } from "react-icons/lu";
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

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

const MedicalRecordDetail = () => {
    const params = useParams();
    const id = params?.id;

    const recordSelected = records.find((record) => record.id === id);

    if (!recordSelected) {
        return <div>Registro no encontrado</div>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-[auto_minmax(0,200px)] grid-rows-[1fr, auto-rows-min, 1fr] md:grid-rows-[auto_auto]'>
            <div className='w-full md:col-span-2 flex gap-2 mb-4 items-center text-sm'>
                <Link href={"../"}>
                    <span className='flex gap-1.5 items-center'>
                        <SlNotebook className='w-3.5' /> Historia clínica
                    </span>
                </Link>
                <IoIosArrowForward />
                <span className='font-semibold'>
                    Ver detalle de {recordSelected.id}
                </span>
            </div>
            <TitleSection text="Detalle" />
            <section className='bg-background w-full h-min rounded-md md:col-span-2 p-3.5 md:py-6 md:px-10 mt-2 shadow-md shadow-muted'>
                <div className="grid grid-cols-[40px_1fr] md:grid-cols-[40px_1fr_1fr] gap-3 items-start my-2">
                    <p className="self-start w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <CircleUser className="text-gray-500" />
                    </p>
                    <div className="pb-2 md:col-span-2">
                        <p className='font-semibold'>{recordSelected.professional}</p>
                        <p className='font-light'>{recordSelected.specialty}</p>
                        <p>Fecha: {recordSelected.date} <span>Hora: {recordSelected.time}</span></p>
                        <p><strong>Motivo:</strong> {recordSelected.subject}</p>
                        <p><strong>Diagnóstico:</strong> {recordSelected.diagnosis}</p>
                        <p><strong>Tratamiento indicado:</strong>
                            <ul className="list-disc list-inside ml-4">{recordSelected.treatments.map(treatment => {
                                return <li>{treatment}</li>
                            })}

                            </ul></p>
                        <p><strong>Estudios médicos:</strong>
                            <ul className="list-disc list-inside ml-4">{recordSelected.medicalStudies.map(studie => {
                                return <li>{studie}</li>
                            })}
                            </ul></p>
                        <p><strong>Observaciones:</strong>
                            <ul className="list-disc list-inside ml-4">{recordSelected.observations.map(observation => {
                                return <li>{observation}</li>
                            })}
                            </ul></p>
                    </div>
                </div>
            </section>
            <h3 className='text-lg font-semibold text-muted-foreground my-4'>Documentos adjuntos</h3>
            <section className='md:col-span-2 md:py-2'>

                <article className='flex justify-between items-center mb-2 bg-background md:w-[50%] h-min rounded-md p-4'>
                    <div className='flex items-center gap-3'>
                        <p className="self-start w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                            <GrDocumentPdf className="text-gray-500" />
                        </p>
                        <p>Receta médica</p>
                    </div>
                    <Button variant={'outline'} className="self-start w-8 h-8 rounded border border-secondary flex items-center justify-center">
                        <LuDownload className="text-secondary" />
                    </Button>
                </article>
                 <article className='flex justify-between items-center mb-2 bg-background md:w-[50%] h-min rounded-md p-4'>
                    <div className='flex items-center gap-3' >
                        <p className="self-start w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                            <GrDocumentPdf className="text-gray-500" />
                        </p>
                        <p>Guía de ejercicios cervicacles</p>
                    </div>
                    <Button variant={'outline'} className="self-start w-8 h-8 rounded border border-secondary flex items-center justify-center">
                        <LuDownload className="text-secondary" />
                    </Button>
                </article>
            </section>

        </div>
    )
}

export default MedicalRecordDetail;
