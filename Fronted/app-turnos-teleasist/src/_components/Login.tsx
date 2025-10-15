"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  /*  FormControl, */
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  /*   FormMessage, */
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/_schemas/login-schema"
import { LoginMutationsService } from "@/_service/use-mutation-services/login-mutation-services"
import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import TitleSection from "@/components/ui/TitleSection"
import ContainerMax300 from "@/components/ui/Container-max300";



export default function LoginForm() {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const { mutationPostLogin } = LoginMutationsService()

  const [inputsViewpassword, setinputsViewpass] = useState(true)

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutationPostLogin.mutate(values)
    console.log(values)
  }
  return (
    <>
      <Logo />
      <Form {...form} >
        <ContainerMax300 >
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[1rem] px-[1rem] ">
            <TitleSection text="Inicio de sesión" />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel htmlFor="email">Correo electronico</FormLabel>
                  <FormControl >
                    <Input className="pl-5 bg-[#F2F4F7] placeholder:text-sm" type="email" placeholder="nombre@gmail.com" id="email"   {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div>
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
                    <FormMessage className="text-xs mb-1" />
                  </FormItem>
                )}
              />
              <Link href={'/'}><p className="text-sm text-right">¿Olvidaste tu contraseña?</p></Link>
            </div>
            <Button type="submit" className="cursor-pointer">Iniciar sesión</Button>
          </form>
          <Button onClick={() => router.push("/register")} className="cursor-pointer mx-[1rem] mt-[1rem]" variant={"outline"}>Registrarse</Button>
        </ContainerMax300>
      </Form>
    </>
  )
}