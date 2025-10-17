"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  /*   FormMessage, */
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerformSchema } from "@/_schemas/register-schema"
import { RegisterMutationsService } from "@/_service/use-mutation-services/register-mutation-services"
import { useState } from "react"
import { useRouter } from "next/navigation";
import TitleSection from "@/components/ui/TitleSection";
import Logo from "@/components/ui/Logo";
import ContainerMax300 from "@/components/ui/Container-max300";
import { LogoMedihub } from "@/components/ui/LogoMedihub";


export default function RegisterForm() {
  const router = useRouter()


  const form = useForm<z.infer<typeof registerformSchema>>({
    resolver: zodResolver(registerformSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: ""
    },
  })
  const { mutationPostRegister } = RegisterMutationsService()

  const [inputsViewpassword, setinputsViewpass] = useState(true)
  const [inputsViewconfpassword, setinputsViewconfpass] = useState(true)

  function onSubmit(values: z.infer<typeof registerformSchema>) {
    mutationPostRegister.mutate(values)
    console.log(values)
  }
  return (
    <>
      <LogoMedihub />
      <Form {...form} >
        <ContainerMax300>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[1rem] px-[1rem] ">
            <TitleSection text="Registro" />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Nombre y Apellido</FormLabel>
                  <FormControl>
                    <Input type="text" className="pl-5 bg-[#F2F4F7] placeholder:text-sm" placeholder="Ingresa tu nombre y apellido" id="username"  {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Correo electronico</FormLabel>
                  <FormControl>
                    <Input className="pl-5 bg-[#F2F4F7] placeholder:text-sm" type="email" placeholder="nombre@gmail.com" id="email"   {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  {
                    inputsViewpassword ?
                      <FaEye onClick={() => setinputsViewpass(!inputsViewpassword)} className="absolute top-[31px] right-2" />
                      :
                      <FaEyeSlash onClick={() => setinputsViewpass(!inputsViewpassword)} className="absolute top-[31px] right-2" />
                  }
                  <FormControl>
                    <Input className="pl-5 bg-[#F2F4F7] placeholder:text-sm" type={`${inputsViewpassword ? "password" : "text"}`} placeholder="Ingresa tu contraseña" id="password"  {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel htmlFor="password">Confirmar contraseña</FormLabel>
                  {
                    inputsViewconfpassword ?
                      <FaEye onClick={() => setinputsViewconfpass(!inputsViewconfpassword)} className="absolute top-[31px] right-2" />
                      :
                      <FaEyeSlash onClick={() => setinputsViewconfpass(!inputsViewconfpassword)} className="absolute top-[31px] right-2" />
                  }
                  <FormControl>
                    <Input className="pl-5 bg-[#F2F4F7] placeholder:text-sm" type={`${inputsViewconfpassword ? "password" : "text"}`}
                      placeholder="Confirma tu contraseña" id="confirmpassword"  {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer">Registrarse</Button>
          </form>
          <Button onClick={() => router.push("/login")} className=" cursor-pointer mx-[1rem] mt-[1rem]" variant={"outline"}>Iniciar sesión</Button>
        </ContainerMax300>
      </Form>
    </>
  )
}