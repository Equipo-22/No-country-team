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
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPassSquema } from "@/_schemas/resetPass-schema"
import { useEffect, useState } from "react"
import Logo from "@/components/ui/Logo";
import TitleSection from "@/components/ui/TitleSection"
import ContainerMax300 from "@/components/ui/Container-max300";
import { ResetPassMutationsService } from "@/_service/use-mutation-services/resetPass-mutation-services";
import { useUserStore } from "@/store/userStore";


export default function ResetPassForm() {

  const form = useForm<z.infer<typeof resetPassSquema>>({
    resolver: zodResolver(resetPassSquema),
    defaultValues: {
      token: "",
      nuevaPassword: ""
    },
  })
  const { mutationPostResetPass } = ResetPassMutationsService()

  const [inputsViewpassword, setinputsViewpass] = useState(true)

  function onSubmit(values: z.infer<typeof resetPassSquema>) {
    mutationPostResetPass.mutate(values)
    console.log(values)
  }

    const { clearUserData } = useUserStore();
  
    useEffect(() => {
      clearUserData();
    }, []);

  return (
    <>
      <Logo />
      <Form {...form} >
        <ContainerMax300 >
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[1rem] px-[1rem] ">
            <TitleSection text="Cambio de contraseña" />
          
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel htmlFor="token">Token</FormLabel>
                      <FormControl>
                      <Input className="pl-5 bg-[#F2F4F7] placeholder:text-sm" type="text" placeholder="Ingresa el token recibido por email" id="token"  {...field} />
                    </FormControl>
                    <FormMessage className="text-xs mb-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nuevaPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel htmlFor="password">Nueva contraseña</FormLabel>
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
            <Button type="submit" className="cursor-pointer">Confirmar</Button>
          </form>
        </ContainerMax300>
      </Form>
    </>
  )
}