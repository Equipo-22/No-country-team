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
import { useState } from "react"
import TitleSection from "@/components/ui/TitleSection"
import ContainerMax300 from "@/components/ui/Container-max300";
import { ResetPassMutationsService } from "@/_service/use-mutation-services/resetPass-mutation-services";
import { useRouter } from "next/navigation";


type onSuccessProps = {
  onSuccess?: () => void
}

export default function ResetPassForm({ onSuccess }: onSuccessProps) {

  const form = useForm<z.infer<typeof resetPassSquema>>({
    resolver: zodResolver(resetPassSquema),
    defaultValues: {
      token: "",
      nuevaPassword: ""
    },
  })
  const { mutationPostResetPass } = ResetPassMutationsService()

  const [inputsViewpassword, setinputsViewpass] = useState(true)

  const router = useRouter()

  function onSubmit(values: z.infer<typeof resetPassSquema>) {
    mutationPostResetPass.mutate(values, {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/login/reset-pass/success")
        }
      }, })
    console.log(values)
  }

  return (
    <Form {...form} >
      <ContainerMax300 >
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4 ">
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
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={mutationPostResetPass.isPending}
          >
            {mutationPostResetPass.isPending ? "Guardando..." : "Confirmar"}</Button>
        </form>
      </ContainerMax300>
    </Form>
  )
}