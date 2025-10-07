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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/_schemas/register-schema"
import { Label } from "@radix-ui/react-label"
import { RegisterMutationsService } from "@/_service/use-mutation-services/register-mutation-services"
import { useState } from "react"
import { useRouter } from "next/navigation";


export function RegisterForm() {
const router =  useRouter()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: ""
    },
  })
  const { mutationPostCategoria } = RegisterMutationsService()

  const [inputsViewpassword, setinputsViewpass] = useState(false)
  const [inputsViewconfpassword, setinputsViewconfpass] = useState(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutationPostCategoria.mutate(values)
    console.log(values)
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[300px] flex flex-col gap-[1rem] p-[1rem]">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel htmlFor="username">Nombre y Apellido</FormLabel>
              <Input type="text" className="placeholder:p-[1.5rem] p-[5px] bg-[#F2F4F7] w-full" placeholder="nombre" id="username"  {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel htmlFor="email">Correo electronico</FormLabel>
              <Input className="placeholder:p-[1.5rem] p-[1rem] bg-[#F2F4F7] w-full" type="email" placeholder="email" id="email"   {...field} />
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
              <Input className="placeholder:p-[1.5rem] p-[1rem] bg-[#F2F4F7] w-full" type={`${inputsViewpassword ? "password" : "text"}`} placeholder="contraseña" id="password"  {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="password">Confirmar Contraseña</FormLabel>
              {
                inputsViewconfpassword ?
                  <FaEye onClick={() => setinputsViewconfpass(!inputsViewconfpassword)} className="absolute top-[31px] right-2" />
                  :
                  <FaEyeSlash onClick={() => setinputsViewconfpass(!inputsViewconfpassword)} className="absolute top-[31px] right-2" />
              }
              <Input className="placeholder:p-[1.5rem] p-[1rem] bg-[#F2F4F7] w-full" type={`${inputsViewconfpassword ? "password" : "text"}`} 
              placeholder="confirmar contraseña" id="password"  {...field} />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#6C757D] p-[2rem] cursor-pointer">Registrarse</Button>
        <Button onClick={() => router.push("/login")} className="border-[1px] border-black cursor-pointer" variant={"ghost"}>Iniciar sesión</Button>


      </form>
    </Form>
  )
}