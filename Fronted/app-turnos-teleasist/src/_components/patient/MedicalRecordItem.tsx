"use client"

import { getRecordById } from '@/_service/use-cases/medicalRecord-service'
import { DataRecordType } from '@/_types/medicalrecord-type'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { CircleUser } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

interface MedicalRecordItemProps {
    encounterId: string;
}

const MedicalRecordItem = ({ encounterId }: MedicalRecordItemProps) => {

    const router = useRouter()

    const [dataRecord, setDataRecord] = useState<DataRecordType | null>(null)
    const [recordDate, setRecordDate] = useState<string>("")


    const [isPending, setIsPending] = useState(false);

    const mutationGetRecordById = useMutation({
        mutationFn: (id: string) => getRecordById(id),
        onSuccess: () => console.log("Se obtuvo la historia clínica del paciente"),
    });

    useEffect(() => {
        if (!encounterId) return;

        setIsPending(true);
        mutationGetRecordById.mutate(encounterId, {
            onSuccess: (data) => {
                setDataRecord(data)

                if (data?.appointment?.startTime) {
                    const rawDate = data.appointment.startTime
                    const formattedDate = new Date(rawDate).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })
                    setRecordDate(formattedDate)
                }
                setIsPending(false);
            },
            onError: () => {
                setIsPending(false);
            }
        })
    }, [encounterId])

    if (isPending) {
        return <p className='m-auto'>Cargando datos</p>
    }

    return (

        <div className="col-span-4 text-sm bg-background w-full h-min rounded-md md:order-3 p-3.5 md:py-6 md:px-14  mt-2 shadow-md shadow-muted">
            <div className="grid grid-cols-[40px_1fr] md:grid-cols-[40px_1fr_1fr_1fr] gap-3 items-start my-2">

                <p className="self-start w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <CircleUser className="text-gray-500" />
                </p>
                <div className="pb-2 md:col-span-2">

                    {dataRecord ? (
                        <div className="pb-2 md:col-span-2">
                            <p className="font-semibold">{dataRecord.doctor.name}</p>
                            <p className="font-light">{dataRecord.doctor.specialty}</p>
                            <p>
                                Fecha: {recordDate}
                            </p>
                            <p>
                                <strong>Motivo: </strong>
                                {dataRecord.appointment.motivo}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No hay información disponible.</p>
                    )}

                </div>
                <Button
                    className="cursor-pointer col-span-2 md:col-span-1 md:col-start-4 w-full md:max-w-[200px] justify-self-end"
                    variant="outline"
                    onClick={() => router.push(`/dashboard-patient/medical-record/detail/${encounterId}`)}
                >
                    Ver detalle
                </Button>
            </div>
        </div>
    )
}

export default MedicalRecordItem
