import { data_dashboard, data_dashbouard_config } from "@/_mock/mock";
import { LogoMedihubWhite } from "@/components/ui/LogoMedihubWhite";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useUserStore } from "@/store/userStore";
import React from "react";

const SideBar = () => {
  const path = usePathname();
  const router = useRouter();
  const clearUserData = useUserStore((state) => state.clearUserData);

  const baseLink =
    "flex items-center gap-2 p-2.5 rounded-[5px] hover:bg-white/40 transition-colors";

  const getLinkClasses = (href: string) =>
    `${baseLink} ${path === href ? "bg-amber-50 text-[#698be7]" : "text-white"}`;

  const handleLogout = () => {
    clearUserData();
    router.push("/login");
  };

  return (
    <section className="flex flex-col justify-between border-r border-[#c5c5c5] dashboard-bg-gradient sticky top-0 h-screen p-4 text-white">
      <div>
        <LogoMedihubWhite />

        <div className="border-b border-gray-300 pb-2 mt-2">
          {data_dashboard.map(({ Icon, href, id, info }) => (
            <Link key={id} href={href} className={getLinkClasses(href)}>
              <Icon className="w-6 h-auto" />
              <span>{info}</span>
            </Link>
          ))}

          <Link
            href="/dashboard-patient/notifications"
            className={getLinkClasses("/dashboard-patient/notifications")}
          >
            <IoIosNotificationsOutline className="w-6 h-auto" />
            <span>Notificaciones</span>
            <div className="bg-white text-[#698be7] rounded-full w-6 h-6 flex justify-center items-center text-sm font-medium ml-auto">
              {data_dashboard.length}
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          {data_dashbouard_config.map(({ Icon, href, id, info }) => (
            <Link key={id} href={href} className={baseLink}>
              <Icon className="w-6 h-auto" />
              <span>{info}</span>
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mt-auto cursor-pointer hover:text-[#698be7] transition-colors"
      >
        <RiLogoutBoxLine className="w-5 h-auto" />
        <p>Cerrar sesión</p>
      </button>
    </section>
  );
};

export default SideBar;
