// "use client"

// import React from 'react'
// import { IoHomeOutline } from "react-icons/io5";
// import { MdOutlinePerson2 } from "react-icons/md";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { CiSettings } from "react-icons/ci";
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Badge } from '@/components/ui/badge';
// import { IoPersonCircleOutline } from "react-icons/io5";
// import { LogoMedihub } from '@/components/ui/LogoMedihub';
// import { RiLogoutBoxLine } from "react-icons/ri";
// import Image from 'next/image';
// import { LogoMedihubWhite } from '@/components/ui/LogoMedihubWhite';
// export const DashboardPatient = ({ children }: { children: React.ReactNode }) => {
//     const path = usePathname()
//     console.log(path)
//     const data_dashboard = [
//         { id: 1, Icon: IoHomeOutline, info: "Inicio", href: "/dashboard-patient/inicio" },
//         { id: 2, Icon: MdOutlinePerson2, info: "Perfil", href: "" },
//         { id: 3, Icon: IoDocumentTextOutline, info: "Mis Citas", href: "" },
//         // { id: 4, Icon: IoIosNotificationsOutline, info: "Notificaciones", href: "", notif: 4 }
//     ]
//     const data_dashbouard_config = [
//         // { id: 1, Icon: LuBookMarked, info: "Documentos", href: "" },
//         { id: 2, Icon: CiSettings, info: "Settings", href: "" },
//     ]
//     return (
//         <div className='min-h-[100dvh] flex '>
//             <section className='border-r-[1px] border-[#c5c5c5] dashboard-bg-gradient
//             top-0 bottom-0 left-0 w-[15rem] h-[100vh] p-[1rem] bg-[#fff] '>
//                 <LogoMedihubWhite />
//                 <div className=' border-b-[1px] border-gray-300 '>
//                     {
//                         data_dashboard.map(({ Icon, href, id, info }) => (
//                             <Link key={id} href={href} className={`flex gap-2 items-center p-[10px] rounded-[5px] hover:bg-[#ffffff6f]  ${path === href ? "bg-amber-50" : ""}`}>
//                                 <Icon className={`h-auto w-[1.5rem]  ${path === href ? "text-[#698be7]" : "text-[#fff]"}`} />
//                                 <div className={`cursor-pointer  ${path === href ? "text-[#698be7]" : "text-[#fff]"}`} >{info}</div>

//                             </Link>
//                         ))
//                     }
//                     <div className='flex gap-2 items-center p-[10px] rounded-[5px] hover:bg-[#ffffff6f]'>
//                         <IoIosNotificationsOutline className='h-auto w-[1.5rem] text-[#fff]' />
//                         <Link href={"/"} className={`  ${path === "/notificaciones" ? "text-[#698be7]" : "text-[#fff]"}`} >Notificaciones</Link>
//                         <div className='bg-[#ffffff] rounded-full w-[1.5rem] h-[1.5rem] flex justify-center items-center'>
//                             <Link className='text-[#000]' href="/">{data_dashboard.length}</Link>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='flex flex-col  gap-2  '>
//                     {
//                         data_dashbouard_config.map(({ Icon, href, id, info }) => (
//                             <div key={id} className='flex items-center gap-2  p-[10px] hover:bg-[#ffffff6f] rounded-[5px]'>
//                                 <Icon className='h-auto w-[1.5rem] text-[#fff]' />
//                                 <Link className='text-[#fff]' href={href}>{info}</Link>
//                             </div>
//                         ))
//                     }
//                 </div>
//                 <div className='flex gap-2 items-center pt-[20rem] '>
//                     <RiLogoutBoxLine className='text-[#fff]' />
//                     <p className='text-[#fff] cursor-pointer'>Cerrar sesion</p>
//                 </div>
//             </section>

//             {children}
//         </div>
//     )
// }
