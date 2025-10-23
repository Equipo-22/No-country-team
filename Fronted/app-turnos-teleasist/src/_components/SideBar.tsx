import { data_dashboard, data_dashbouard_config } from '@/_mock/mock'
import { LogoMedihubWhite } from '@/components/ui/LogoMedihubWhite'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { RiLogoutBoxLine } from 'react-icons/ri'

const SideBar = () => {

    const path = usePathname()
    // top-0 bottom-0 left-0 
    return (
        <section className='border-r-[1px] border-[#c5c5c5] dashboard-bg-gradient sticky top-0
             h-screen p-[1rem]  '>
            <LogoMedihubWhite />
            <div className=' border-b-[1px] border-gray-300 '>
                {
                    data_dashboard.map(({ Icon, href, id, info }) => (
                        <Link key={id} href={href} className={`flex gap-2 items-center p-[10px] rounded-[5px] hover:bg-[#ffffff6f]  ${path === href ? "bg-amber-50" : ""}`}>
                            <Icon className={`h-auto w-[1.5rem]  ${path === href ? "text-[#698be7]" : "text-[#fff]"}`} />
                            <div className={`cursor-pointer  ${path === href ? "text-[#698be7]" : "text-[#fff]"}`} >{info}</div>

                        </Link>
                    ))
                }
                <div className={`flex gap-2 items-center p-[10px] rounded-[5px] hover:bg-[#ffffff6f] ${path === "/dashboard-patient/notifications" ? "bg-amber-50" : ""}`}>
                    <IoIosNotificationsOutline className={`h-auto w-[1.5rem] ${path === "/dashboard-patient/notifications" ? "text-[#698be7]" : "text-[#fff]"}`} />
                    <Link href={"/dashboard-patient/notifications"} className={`  ${path === "/dashboard-patient/notifications" ? "text-[#698be7]" : "text-[#fff]"}`} >Notificaciones</Link>
                    <div className='bg-[#ffffff] rounded-full w-[1.5rem] h-[1.5rem] flex justify-center items-center'>
                        <Link className='text-[#000]' href="/dashboard-patient/notifications">{data_dashboard.length}</Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-col  gap-2  '>
                {
                    data_dashbouard_config.map(({ Icon, href, id, info }) => (
                        <div key={id} className='flex items-center gap-2  p-[10px] hover:bg-[#ffffff6f] rounded-[5px]'>
                            <Icon className='h-auto w-[1.5rem] text-[#fff]' />
                            <Link className='text-[#fff]' href={href}>{info}</Link>
                        </div>
                    ))
                }
            </div>
            <div className='flex gap-2 items-center pt-[20rem] '>
                <RiLogoutBoxLine className='text-[#fff]' />
                <p className='text-[#fff] cursor-pointer'>Cerrar sesion</p>
            </div>
        </section>
    )
}

export default SideBar