"use client"
import TitleSection from '@/components/ui/TitleSection'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { SlNotebook } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { CircleUser } from 'lucide-react';
import { GrDocumentPdf } from "react-icons/gr";
import { LuDownload } from "react-icons/lu";
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MedicalRecordMutationsService } from '@/_service/use-mutation-services/medicalRecord-mutation-services';
import { DataRecordType } from '@/_types/medicalrecord-type';


const MedicalRecordDetail = () => {
    const params = useParams();
    const idParam = params?.id;
    const idRecord = Array.isArray(idParam) ? idParam[0] : idParam;

    const [recordSelected, setRecordSelected] = useState<DataRecordType | null>(null)
    const [recordDate, setRecordDate] = useState<string>("")

    const { mutationGetRecordById } = MedicalRecordMutationsService()

    useEffect(() => {
        if (!idRecord) return;

        mutationGetRecordById.mutate(idRecord, {
            onSuccess: (data) => {
                setRecordSelected(data)
                console.log({ data })

                if (data?.appointment?.startTime) {
                    const rawDate = data.appointment.startTime
                    const formattedDate = new Date(rawDate).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })
                    setRecordDate(formattedDate)
                }
            },
        })
    }, [idRecord])


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
                    Ver detalle
                </span>
            </div>
            <TitleSection text="Detalle" />
            <section className='bg-background w-full h-min rounded-md md:col-span-2 p-3.5 md:py-6 md:px-10 mt-2 shadow-md shadow-muted'>
                <div className="grid grid-cols-[40px_1fr] md:grid-cols-[40px_1fr_1fr] gap-3 items-start my-2">
                    <p className="self-start w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <CircleUser className="text-gray-500" />
                    </p>
                    <div className="pb-2 md:col-span-2">
                        {recordSelected ? (
                            <div>
                                <p className="font-semibold">{recordSelected.doctor.name}</p>
                                <p className="font-light">{recordSelected.doctor.specialty}</p>
                                <p>
                                    Fecha: {recordDate}{" "}
                                    <span>Hora: {recordSelected.appointment.startTime.slice(11, 16)}</span>
                                </p>
                                <p>
                                    <strong>Motivo:</strong> {recordSelected.appointment.motivo}
                                </p>
                                {recordSelected.conditions?.[0] && (
                                    <p>
                                        <strong>Diagnóstico:</strong> {recordSelected.conditions[0].description}
                                    </p>
                                )}
                                {(recordSelected.observations?.length ?? 0) > 0 && (
                                    <p>
                                        <strong>Tratamiento indicado:</strong>
                                        <ul className="list-disc list-inside ml-4">
                                            {recordSelected.observations?.map((treatment, index) => (
                                                <li key={index}>{treatment.descripcion}</li>
                                            ))}
                                        </ul>
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No hay información disponible.
                            </p>
                        )}

                    </div>
                </div>
            </section>
            {/*    <h3 className='text-lg font-semibold text-muted-foreground my-4'>Documentos adjuntos</h3>
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
            </section> */}
        </div>
    )
}

export default MedicalRecordDetail;
