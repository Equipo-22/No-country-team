"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { RegisterMutationsService } from "@/_service/use-mutation-services/register-mutation-services"
import { useRouter } from "next/navigation";
import { completeProphilePatientSchema } from "@/_schemas/complete-prohile-patient";


export function CompleteProhilePatient() {
const router =  useRouter()


  const form = useForm<z.infer<typeof completeProphilePatientSchema>>({
    resolver: zodResolver(completeProphilePatientSchema),
    defaultValues: {
      dni: 0,
      obra_social: "",
      nombre_obra_social: "",
      nombre_afiliado: "",
      numero_afiliado: 0,
      tel: 0,
      direccion: ""
    },
  })
  const { mutationPostRegister} = RegisterMutationsService()



  function onSubmit(values: z.infer<typeof completeProphilePatientSchema>) {
    // mutationPostRegister.mutate(values)
    console.log(values)
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full 
      max-w-[300px] flex flex-col gap-[1rem] p-[1rem] mx-auto justify-center ">
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel htmlFor="username">DNI*</FormLabel>
              <Input type="text" className="placeholder:p-[1.5rem] p-[5px] bg-[#F2F4F7] w-full" placeholder="nombre" id="username"  {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="obra_social"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel htmlFor="obra_social">¿Obra social o particular?</FormLabel>
              <Input className="placeholder:p-[1.5rem] p-[1rem] bg-[#F2F4F7] w-full" type="text" placeholder="Tu obra social" id="obra_social"   {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nombre_obra_social"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel htmlFor="obra_social">Nombre de la obra social </FormLabel>
              <Input className="placeholder:p-[1.5rem] p-[1rem] bg-[#F2F4F7] w-full" type="text" placeholder="Tu obra social" id="obra_social"   {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numero_afiliado"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="password">Numero afiliado</FormLabel>
             
              <Input className="placeholder:p-[1.5rem] p-[1rem] bg-[#F2F4F7] w-full" type="text" placeholder="numero del afiliado" id="nombre_afiliado"  {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="tel">Telefono</FormLabel>
             
              <Input className="placeholder:p-[1.5rem] p-[1rem] bg-[#F2F4F7] w-full" type="number"
              placeholder="numero de celular" id="tel"  {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="tel">Direccion</FormLabel>
             
              <Input className="placeholder:p-[1.5rem] p-[1rem] bg-[#F2F4F7] w-full" type="number"
              placeholder="Direccion" id="tel"  {...field} />
            </FormItem>
          )}
        />
        <Button onClick={() => router.push("/welcome-patient")} className="bg-[#6C757D] p-[2rem] cursor-pointer">Continuar</Button>


      </form>
    </Form>
  )
}