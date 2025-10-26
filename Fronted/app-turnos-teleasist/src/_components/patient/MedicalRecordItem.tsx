import { Button } from '@/components/ui/button'
import { CircleUser } from 'lucide-react'
import React from 'react'

const MedicalRecordItem = () => {
    return (
        <div className="col-span-4 text-sm bg-background w-full h-min rounded-md md:order-3 p-3.5 md:py-6 md:px-14  mt-2 shadow-md shadow-muted">
            <div className="grid grid-cols-[40px_1fr] md:grid-cols-[40px_1fr_1fr_1fr] gap-3 items-start my-2">
                <p className="self-start w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <CircleUser className="text-gray-500" />
                </p>
                <div className="pb-2 md:col-span-2">
                    <p className='font-semibold'>Dr. Juan Cruz Gómez </p>
                    <p className='font-light'>Médico general</p>
                    <p>Fecha: 09/10/25  <span>Hora: 08:00hs.</span></p>
                    <p><strong>Motivo:</strong> Dolor de cabeza persistente, especialmente en las tardes, acompañado de tensión en el cuello y fatiga visual.</p>

                </div>
                <Button
                    className="cursor-pointer col-span-2 md:col-span-1 md:col-start-4 w-full md:max-w-[200px] justify-self-end"
                    variant="outline"
                >
                    Ver detalle
                </Button>
            </div>
        </div>
    )
}

export default MedicalRecordItem
