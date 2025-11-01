"use client"
import TitleSection from '@/components/ui/TitleSection'
import React, { useEffect, useState } from 'react'
import MedicalRecordItem from './MedicalRecordItem'
import { useUserStore } from '@/store/userStore'
import { MedicalRecordMutationsService } from '@/_service/use-mutation-services/medicalRecord-mutation-services'
import { MedicalRecordResponse } from '@/_types/medicalrecord-type'
import { record } from 'zod/v3'
import { useMutation } from '@tanstack/react-query'
import { getMedicalRecordByIdPatient } from '@/_service/use-cases/medicalRecord-service'

interface MedicalRecord {
    fullEncounters: { content: any[] };
}

const MedicalRecord = () => {

    const { idPatient, hasHydrated } = useUserStore()
    const [recordsId, setRecordsId] = useState<string[]>([])

    const [isPending, setIsPending] = useState(false);

    const mutationGetMedicalRecordByIdPatient = useMutation({
        mutationFn: (id: string) => getMedicalRecordByIdPatient(id),
        onSuccess: () => console.log("Se obtuvo la historia clínica del paciente"),
    });


    useEffect(() => {
        if (!idPatient) return;

        setIsPending(true);
        mutationGetMedicalRecordByIdPatient.mutate(idPatient, {
            onSuccess: (data) => {
                const encountersId = data.fullEncounters.content
                    .map((item: any) => item.conditions?.[0]?.encounterId)
                    .filter((id: string | undefined): id is string => id !== undefined)
                    .map((id: string) => id.replace("Encounter/", ""));

                setRecordsId(encountersId);
                setIsPending(false);
            },
            onError: () => {
                setIsPending(false);
            }
        });
    }, [idPatient]);

    if (!hasHydrated || isPending) {
        return <p className='m-auto'>Cargando historial clínico...</p>
    }

    return (

        <div className='grid grid-cols-1 md:grid-cols-[auto_minmax(0,200px)] grid-rows-[1fr, auto-rows-min, 1fr] md:grid-rows-[auto_auto]'>
            <TitleSection text="Historia clínica" />
            <section className='bg-background w-full h-min rounded-md md:order-3 md:col-span-2 p-3.5 md:py-6 md:px-16  mt-2 shadow-md shadow-muted'>
                <article className="grid grid-cols-4 grid-row-4 gap-2 py-3 border-b">
                    <p className='text-secondary font-bold py-2 col-span-4'>Información general</p>
                    <div className='col-span-4 md:col-span-2 text-sm'>
                        {recordsId.length > 0 ? (
                            <div className='grid grid-cols-2 gap-3 my-4'>
                                <p>Última cita médica:</p>
                                <p>22/10/25</p>
                                <p>Última actualización de historia clínica:</p>
                                <p>24/10/25</p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No hay información disponible.
                            </p>
                        )}
                    </div>
                </article>
                <article className="grid grid-cols-4 gap-2 py-3">
                    <p className="text-secondary font-bold py-2 col-span-4">Actualizaciones</p>
                    {recordsId && recordsId.length > 0 ? (
                        recordsId.map((recordId, index) => {
                            return <MedicalRecordItem key={index} encounterId={recordId}
                            />
                        })
                    ) : (
                        <p className="col-span-4 text-sm text-muted-foreground">
                            No hay registros disponibles.
                        </p>
                    )}
                </article>
            </section>
        </div>
    )
}

export default MedicalRecord
