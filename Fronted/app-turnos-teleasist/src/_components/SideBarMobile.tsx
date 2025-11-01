"use client"

import { data_dashboard, data_dashboard_config } from "@/_mock/mock"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { IoIosNotificationsOutline } from "react-icons/io"
import { RiLogoutBoxLine } from "react-icons/ri"
import { useUserStore } from "@/store/userStore"
import React, { Dispatch, SetStateAction } from "react"

interface SideBarMobileProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  qtyNotifications: number
}

const SideBarMobile = ({ open, setOpen, qtyNotifications }: SideBarMobileProps) => {
  const path = usePathname()
  const router = useRouter()
  const clearUserData = useUserStore((state) => state.clearUserData)

  const baseLink =
    "flex items-center gap-2 p-2.5 rounded-[5px] hover:bg-white/40 transition-colors"

  const getLinkClasses = (href: string) =>
    `${baseLink} ${path === href ? "bg-amber-50 text-[#698be7]" : "text-white"}`

  const handleLogout = () => {
    clearUserData()
    router.push("/login")
  }

  const styleSection =
    "flex-col justify-between border-r border-[#c5c5c5] dashboard-bg-gradient sticky p-4 text-white flex lg:hidden"

  return (
    <section className={`${styleSection} ${open ? "slide_open top-0 h-screen z-30 fixed left-0 w-64" : "slide_close hidden"}`}>
      <div className="mt-2 flex flex-col h-full">

        <div className="border-b border-gray-300 pb-2 mt-2">
          {data_dashboard.map(({ Icon, href, id, info }) => (
            <Link
              key={id}
              href={href}
              onClick={() => setOpen(false)}
              className={getLinkClasses(href)}
            >
              <Icon className="w-6 h-auto" />
              <span>{info}</span>
            </Link>
          ))}

          <Link
            href="/dashboard-patient/notifications"
            onClick={() => setOpen(false)}
            className={getLinkClasses("/dashboard-patient/notifications")}
          >
            <IoIosNotificationsOutline className="w-6 h-auto" />
            <span>Notificaciones</span>
            <div
              className={`${path === "/dashboard-patient/notifications"
                ? "bg-primary text-white"
                : "bg-white text-[#698be7]"
                } rounded-full w-6 h-6 flex justify-center items-center text-sm font-medium ml-auto`}
            >
              {qtyNotifications}
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          {data_dashboard_config.map(({ Icon, href, id, info }) => (
            <Link
              key={id}
              href={href}
              onClick={() => setOpen(false)}
              className={getLinkClasses(href)}
            >
              <Icon className="w-6 h-auto" />
              <span>{info}</span>
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-auto px-4 py-3 cursor-pointer hover:text-secondary transition-colors"
        >
          <RiLogoutBoxLine className="w-6 h-auto" />
          <p>Cerrar sesión</p>
        </button>
      </div>
    </section>
  )
}

export default SideBarMobile
