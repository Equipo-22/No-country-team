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
import { formSchema } from "@/_schemas/register-schema"
import { RegisterMutationsService } from "@/_service/use-mutation-services/register-mutation-services"
import { useState } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.svg"


export function RegisterForm() {
  const router = useRouter()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutationPostRegister.mutate(values)
    console.log(values)
  }
  return (
    <>
      <Image
        src={logo}
        alt="Logo Medihub"
        width={200}
        className="mb-4"
      />
      <Form {...form} >
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[300px] flex flex-col gap-[1rem] p-[1rem]">
          <p className="text-2xl font-semibold mb-2">Registrate</p>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel htmlFor="username">Nombre y Apellido</FormLabel>
                <FormControl>
                  <Input type="text" className="pl-5 bg-[#F2F4F7]" placeholder="nombre" id="username"  {...field} />
                </FormControl>
               <FormMessage className="text-xs"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel htmlFor="email">Correo electronico</FormLabel>
                <FormControl>
                  <Input className="pl-5 bg-[#F2F4F7]" type="email" placeholder="email" id="email"   {...field} />
                </FormControl>
                <FormMessage className="text-xs"/>
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
                  <Input className="pl-5 bg-[#F2F4F7]" type={`${inputsViewpassword ? "password" : "text"}`} placeholder="contraseña" id="password"  {...field} />
                </FormControl>
                <FormMessage className="text-xs"/>
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
                  <Input className="pl-5 bg-[#F2F4F7]" type={`${inputsViewconfpassword ? "password" : "text"}`}
                    placeholder="confirmar contraseña" id="confirmpassword"  {...field} />
                </FormControl>
                <FormMessage className="text-xs"/>
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">Registrarse</Button>
          <Button onClick={() => router.push("/login")} className=" cursor-pointer" variant={"outline"}>Iniciar sesión</Button>


        </form>
      </Form>
    </>
  )
}