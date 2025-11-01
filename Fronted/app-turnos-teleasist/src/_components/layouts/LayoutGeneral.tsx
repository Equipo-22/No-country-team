"use client";
import Logo from "@/components/ui/Logo";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LayoutGeneral({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isOnDashboard = pathname.startsWith("/dashboard");

    return isOnDashboard ? (
        children
    ) : (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 w-full" >
            <div className="flex flex-col justify-center items-center px-6 py-10 md:px-16 lg:px-24 bg-white">
                <Logo />
                {children}
            </div>
            <div className="hidden md:block relative w-full h-full">
                <Image
                    src="/teleasistencia.jpg"
                    alt="imagen teleconsulta médica"
                    fill
                    className="object-cover object-[50%_5%]"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    );
}