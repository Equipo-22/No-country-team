"use client";

import { Button } from '@/components/ui/button';
import TitleSection from '@/components/ui/TitleSection';
import { FileText, SquarePen } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useUserStore } from '@/store/userStore';
import { ReqPassResetMutationsService } from '@/_service/use-mutation-services/reqPassReset-mutation-services';
import { useRouter } from 'next/navigation';
import ResetPasswordModal from '../ResetPassModal';
import { ProfileMutationsService } from '@/_service/use-mutation-services/profile-mutation-services';


const Profile = () => {

  const router = useRouter()
  const [openResetPassModal, setOpenResetPassModal] = useState(false);
  const { idPatient, email, username, hasHydrated } = useUserStore()
  const [patient, setPatient] = useState<any>(null)
  const [age, setAge] = useState<any>(null)

  const { mutationPostReqPassReset } = ReqPassResetMutationsService()
  const { mutationGetProfileById } = ProfileMutationsService()

  const handleReqPassReset = () => {
    mutationPostReqPassReset.mutate(
      { email, redirect: false }
    )
    setOpenResetPassModal(true)
  }

  useEffect(() => {
    if (!idPatient) return;

    mutationGetProfileById.mutate(idPatient, {
      onSuccess: (data) => {
        setPatient(data);

        const birthDate = new Date(data.fechaNacimiento);
        const today = new Date();

        let edad = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Ajusta si todavía no cumplió años este año
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          edad--;
        }

        setAge(edad);
      },
    });
  }, [idPatient]);


  if (!hasHydrated || !patient) {
    return <p className='m-auto'>Cargando perfil...</p>
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-[auto_minmax(0,200px)] grid-rows-[1fr, auto-rows-min, 1fr] md:grid-rows-[auto_auto]'>
        <TitleSection text="Mi perfil" />
        <section className='bg-background w-full h-min rounded-md md:order-3 md:col-span-2 p-3.5 md:py-6 md:px-16  mt-2 shadow-md shadow-muted'>
          <article className="grid grid-cols-4 grid-row-4 gap-2 py-3 border-b">
            <Image
              src={patient.genero === "femenino" ? "/profile_1.jpg" : "/profile_2.jpg"}
              alt="Foto perfil"
              width={82}
              height={82}
              className="w-16 h-16 rounded-full object-cover col-span-2"
            />
            <SquarePen className='col-span-2 text-secondary justify-self-end h-5' />
            <p className='text-secondary font-bold py-2 col-span-4'>Información personal</p>
            <div className='col-span-4 md:col-span-2 text-sm'>
              <div className='grid grid-cols-2 gap-3 my-4'>
                <p >Nombre y apellido</p>
                <p >{username}</p>
                <p >Género</p>
                <p >{patient.genero}</p>
                <p >Fecha de nacimiento</p>
                <p >{patient.fechaNacimiento}</p>
                <p >Edad</p>
                <p >{age} años</p>
              </div>
            </div>
          </article>
          <article className="grid grid-cols-4 grid-row-4 gap-2 py-3 border-b">
            <p className='text-secondary font-bold py-2 col-span-4'>Información de contacto</p>
            <div className='col-span-4 md:col-span-2 text-sm'>
              <div className='grid grid-cols-2 gap-3 my-4'>
                <p >Email</p>
                <p >{email}</p>
                <p >Teléfono</p>
                <p >{patient.telefono}</p>
                <p >Dirección</p>
                <p >{patient.direccion}</p>
              </div>
            </div>
          </article>
          <article className="grid grid-cols-4 grid-row-4 gap-2 py-3 border-b">
            <p className='text-secondary font-bold py-2 col-span-4'>Cobertura</p>
            <div className='col-span-4 md:col-span-2 text-sm'>
              <div className='grid grid-cols-2 gap-3 my-4'>
                <p >Obra social</p>
                <p >{patient.obraSocial}</p>
                <p >Número de afiliado</p>
                <p >{patient.numeroAfiliado}</p>
              </div>
            </div>
          </article>
          <article className="grid grid-cols-4 gap-2 py-3">
            <p className="text-secondary font-bold py-2 col-span-4">Contraseña</p>

            <div className="col-span-4 text-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center my-4">
                <p className="col-span-1">Contraseña actual</p>
                <p className="col-span-1">*************</p>

                <Button
                  className="cursor-pointer col-span-2 md:col-span-1 md:col-start-4 w-full md:max-w-[200px] justify-self-end"
                  variant="outline"
                  onClick={handleReqPassReset}
                >
                  Cambiar contraseña
                </Button>
                <ResetPasswordModal isOpen={openResetPassModal} onClose={() => setOpenResetPassModal(!openResetPassModal)} />
              </div>
            </div>
          </article>
        </section>
        <Button className='md:order-2 mt-4 md:mt-0' onClick={() => router.push("/dashboard-patient/medical-record")}>
          <FileText /> Ver historia clínica
        </Button>
      </div>
    </>
  )
}

export default Profile
