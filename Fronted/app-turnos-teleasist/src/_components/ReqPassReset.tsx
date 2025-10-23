"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import Logo from "@/components/ui/Logo";
import TitleSection from "@/components/ui/TitleSection"
import ContainerMax300 from "@/components/ui/Container-max300";
import { reqPassResetSchema } from "@/_schemas/reqPassReset-schema";
import { ReqPassResetMutationsService } from "@/_service/use-mutation-services/reqPassReset-mutation-services";



export default function ReqPassResetForm() {

  const form = useForm<z.infer<typeof reqPassResetSchema>>({
    resolver: zodResolver(reqPassResetSchema),
    defaultValues: {
      email: ""
    },
  })
  const { mutationPostReqPassReset } = ReqPassResetMutationsService()

  function onSubmit(values: z.infer<typeof reqPassResetSchema>) {
    mutationPostReqPassReset.mutate(values)
  }
  return (
    <Form {...form} >
      <ContainerMax300 >
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4 ">
          <TitleSection text="Restablecer contraseña" />
          <p className="text-sm ">Ingresa tu correo electrónico y te enviaremos un token para restablecerla</p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <FormControl >
                  <Input className="pl-5 bg-[#F2F4F7] placeholder:text-sm" type="email" placeholder="nombre@gmail.com" id="email"   {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">Restablecer</Button>
        </form>
      </ContainerMax300>
    </Form>
  )
}