"use client";

import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import TitleSection from '@/components/ui/TitleSection';
import { FileText, SquarePen } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import { useUserStore } from '@/store/userStore';
import { ReqPassResetMutationsService } from '@/_service/use-mutation-services/reqPassReset-mutation-services';
import ResetPassForm from '../ResetPass';
import { usePathname } from 'next/navigation';

const user = {
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

const Profile = () => {

  const [openResetPassModal, setOpenResetPassModal] = useState(false);
  const { email, username, hasHydrated } = useUserStore()

  const { mutationPostReqPassReset } = ReqPassResetMutationsService()

  const handleReqPassReset = () => {
    mutationPostReqPassReset.mutate(
      { email, redirect: false }
    )
    setOpenResetPassModal(true)
  }

  if (!hasHydrated) {
    return <p className='m-auto'>Cargando perfil...</p>
  }

  return (
    <>
      <div className="p-10">
        <div className='grid grid-cols-1 md:grid-cols-[auto_minmax(0,200px)] grid-rows-[1fr, auto-rows-min, 1fr] md:grid-rows-[auto_auto]'>
          <TitleSection text="Mi perfil" />
          <section className='bg-background w-full h-min rounded-md md:order-3 md:col-span-2 p-3.5 md:py-6 md:px-16  mt-2 shadow-md shadow-muted'>
            <article className="grid grid-cols-4 grid-row-4 gap-2 py-3 border-b">
              <Image
                src="/profile_1.jpg"
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
                  <p >{user.genero}</p>
                  <p >Fecha de nacimiento</p>
                  <p >{user.fecha_nacimiento}</p>
                  <p >Edad</p>
                  <p >{user.edad}</p>
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
                  <p >{user.telefono}</p>
                  <p >Dirección</p>
                  <p >{user.direccion}</p>
                </div>
              </div>
            </article>
            <article className="grid grid-cols-4 grid-row-4 gap-2 py-3 border-b">
              <p className='text-secondary font-bold py-2 col-span-4'>Cobertura</p>
              <div className='col-span-4 md:col-span-2 text-sm'>
                <div className='grid grid-cols-2 gap-3 my-4'>
                  <p >Obra social</p>
                  <p >{user.obra_social}</p>
                  <p >Número de afiliado</p>
                  <p >{user.nro_afiliado}</p>
                </div>
              </div>
            </article>
            <article className="grid grid-cols-4 gap-2 py-3">
              <p className="text-secondary font-bold py-2 col-span-4">Contraseña</p>

              <div className="col-span-4 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center my-4">
                  <p className="col-span-1">Contraseña actual</p>
                  <p className="col-span-1">{user.password}</p>

                  <Button
                    className="cursor-pointer col-span-2 md:col-span-1 md:col-start-4 w-full md:max-w-[200px] justify-self-end"
                    variant="outline"
                    onClick={handleReqPassReset}
                  >
                    Cambiar contraseña
                  </Button>
                  <Modal isOpen={openResetPassModal} onClose={() => setOpenResetPassModal(!openResetPassModal)} >
                    <ResetPassForm setOpenResetPassModal={setOpenResetPassModal}/>
                  </Modal>
                </div>
              </div>
            </article>
          </section>
          <Button className='md:order-2 mt-4 md:mt-0'>
            <FileText /> Ver historia clínica
          </Button>
        </div>
      </div>
    </>
  )
}

export default Profile
