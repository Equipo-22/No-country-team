"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button"
import {
  Form,
  /*  FormControl, */
  FormField,
  FormItem,
  FormLabel,
  /*   FormMessage, */
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/_schemas/login-schema"
import { LoginMutationsService } from "@/_service/use-mutation-services/login-mutation-services"
import { useState } from "react"
import { useRouter } from "next/navigation";


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
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[300px] flex flex-col gap-[1rem] p-[1rem]">

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
        <Button type="submit" className="bg-[#6C757D] p-[2rem] cursor-pointer">Iniciar sesión</Button>
        <Button onClick={() => router.push("/register")} className="border-[1px] border-black cursor-pointer" variant={"ghost"}>Registrarse</Button>
      </form>
    </Form>
  )
}