import { data_dashboard, data_dashbouard_config } from '@/_mock/mock'
import { LogoMedihubWhite } from '@/components/ui/LogoMedihubWhite'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { RiLogoutBoxLine } from 'react-icons/ri'

const SideBar = () => {

    const path = usePathname()

    return (
        <section className='flex flex-col justify-between border-r border-[#c5c5c5] dashboard-bg-gradient sticky top-0 h-screen p-4 text-white'>
            <div>
            <LogoMedihubWhite />
            <div className=' border-b border-gray-300 '>
                {
                    data_dashboard.map(({ Icon, href, id, info }) => (
                        <Link key={id} href={href} className={`flex gap-2 items-center p-2.5 rounded-[5px] hover:bg-[#ffffff6f]  ${path === href ? "bg-amber-50" : ""}`}>
                            <Icon className={`h-auto w-6  ${path === href ? "text-[#698be7]" : "text-white"}`} />
                            <div className={`cursor-pointer  ${path === href ? "text-[#698be7]" : "text-white"}`} >{info}</div>

                        </Link>
                    ))
                }
                <div className={`flex gap-2 items-center p-2.5 rounded-[5px] hover:bg-[#ffffff6f] ${path === "/dashboard-patient/notifications" ? "bg-amber-50" : ""}`}>
                    <IoIosNotificationsOutline className={`h-auto w-6${path === "/dashboard-patient/notifications" ? "text-[#698be7]" : "text-[#fff]"}`} />
                    <Link href={"/dashboard-patient/notifications"} className={`  ${path === "/dashboard-patient/notifications" ? "text-[#698be7]" : "text-white"}`} >Notificaciones</Link>
                    <div className='bg-[#ffffff] rounded-full w-6 h-6 flex justify-center items-center'>
                        <Link className='text-white' href="/dashboard-patient/notifications">{data_dashboard.length}</Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-col  gap-2  '>
                {
                    data_dashbouard_config.map(({ Icon, href, id, info }) => (
                        <div key={id} className='flex items-center gap-2  p-2.5 hover:bg-[#ffffff6f] rounded-[5px]'>
                            <Icon className='h-auto w-6 ' />
                            <Link className='text-white' href={href}>{info}</Link>
                        </div>
                    ))
                }
            </div>
            </div>
            <div className='flex gap-2 items-center pt-80 '>
                <RiLogoutBoxLine className='text-white' />
                <p className='text-white cursor-pointer'>Cerrar sesion</p>
            </div>
        </section>
    )
}

export default SideBar