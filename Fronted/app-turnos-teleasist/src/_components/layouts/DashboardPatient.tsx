"use client"
import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePerson2 } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuBookMarked } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { IoPersonCircleOutline } from "react-icons/io5";
export const DashboardPatient = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname()
    console.log(path)
    const data_dashboard = [
        { id: 1, Icon: IoHomeOutline, info: "Inicio", href: "" },
        { id: 2, Icon: MdOutlinePerson2, info: "Perfil", href: "" },
        { id: 3, Icon: IoDocumentTextOutline, info: "Mis Citas", href: "" }
        // { id: 4, Icon: IoIosNotificationsOutline, info: "Notificaciones", href: "" },
    ]
    const data_dashbouard_config = [
        // { id: 1, Icon: LuBookMarked, info: "Documentos", href: "" },
        { id: 2, Icon: CiSettings, info: "Settings", href: "" },
    ]
    return (
        <div className='min-h-[100dvh] flex '>
            <section className='border-r-[1px] border-[#c5c5c5] 
            top-0 bottom-0 left-0 w-fit h-[100vh] p-[1rem] bg-[#fff]'>
                <div className='flex gap-[10px]'>
                    <img className='h-auto w-full' src="/logo-svg-app.svg" alt="imagen" />
                    <h1 className='py-[1rem] g-text-gradientcolor'>Medihub</h1>
                </div>
                <div className=' border-b-[1px] border-gray-300 '>
                    {
                        data_dashboard.map(({ Icon, href, id, info }) => (
                            <div key={id} className='flex gap-2 items-center py-[10px]'>
                                <Icon className='h-auto w-[1.5rem]' />
                                <Link href={""}>{info}</Link>
                            </div>
                        ))
                    }
                    <div className='flex gap-2 items-center py-[10px]'>
                        <IoIosNotificationsOutline className='h-auto w-[1.5rem]' />
                        <Link href="/">Notificaciones</Link>
                        <Badge asChild className='bg-[#698be7] '>
                            <Link href="/">{data_dashboard.length}</Link>
                        </Badge>
                    </div>
                </div>
                <div className='flex flex-col  gap-2  py-[10px]'>
                    {
                        data_dashbouard_config.map(({ Icon, href, id, info }) => (
                            <div key={id} className='flex items-center gap-2'>
                                <Icon className='h-auto w-[1.5rem]' />
                                <Link href={href}>{info}</Link>
                            </div>
                        ))
                    }
                </div>
            </section>
            <nav className='flex w-full h-[10vh]  items-center bg-[#fff]'>
                <div className='flex gap-2 items-center w-full justify-end'>
                    <IoIosNotificationsOutline className='h-auto w-[2rem]'/>
                    <IoPersonCircleOutline className='h-auto w-[2rem]'/>
                </div>
            </nav>
            {children}

        </div>
    )
}
