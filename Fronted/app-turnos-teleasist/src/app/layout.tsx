import type { Metadata } from "next";
import "./globals.css";
import { ContextProvider } from "@/_context/Providers";
import LayoutGeneral from "@/_components/layouts/LayoutGeneral";


export const metadata: Metadata = {
  title: "Medihub",
  description: "Espacio digital para cuidar tu salud de forma simple, segura y conectada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="es">
      <body className={`antialiased`}>
        <ContextProvider>
         <LayoutGeneral>
          {children}
         </LayoutGeneral>
        </ContextProvider>
      </body>
    </html>
  );
}