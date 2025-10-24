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
import { loginFormSchema } from "@/_schemas/login-schema"
import { LoginMutationsService } from "@/_service/use-mutation-services/login-mutation-services"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import TitleSection from "@/components/ui/TitleSection"
import ContainerMax300 from "@/components/ui/Container-max300";
import { useUserStore } from "@/store/userStore";



export default function LoginForm() {

  const router = useRouter()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const { mutationPostLogin } = LoginMutationsService()

  const [inputsViewpassword, setinputsViewpass] = useState(true)

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    mutationPostLogin.mutate(values)
    console.log(values)
  }

  const { clearUserData } = useUserStore();

  useEffect(() => {
    clearUserData();
  }, []);

  return (
    <Form {...form} >
      <ContainerMax300 >
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4 ">
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
            <Link href={'/login/req-pass-reset'}><p className="text-sm text-right">¿Olvidaste tu contraseña?</p></Link>
          </div>
           {mutationPostLogin.isError && (
            <p className="text-destructive text-sm">
              {(mutationPostLogin.error as Error).message}
            </p>
          )}
          <Button type="submit" className="cursor-pointer">Iniciar sesión</Button>
        </form>
        <Button onClick={() => router.push("/register")} className="cursor-pointer mx-4 mt-4" variant={"outline"}>Registrarse</Button>
      </ContainerMax300>
    </Form>
  )
}