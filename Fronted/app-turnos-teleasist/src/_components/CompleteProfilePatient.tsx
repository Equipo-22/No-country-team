"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  /*   FormMessage, */
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { completeProfilePatientSchema } from "@/_schemas/complete-profile-patient";
import ContainerMax300 from "@/components/ui/Container-max300"
import Logo from "@/components/ui/Logo"
import TitleSection from "@/components/ui/TitleSection"
import { useEffect } from "react"


export function CompleteProfilePatient() {
  const router = useRouter()


  const form = useForm<z.infer<typeof completeProfilePatientSchema>>({
    resolver: zodResolver(completeProfilePatientSchema),
    defaultValues: {
      dni: "",
      genero: "femenino",
      cobertura: "obra_social",
      obra_social: "",
      nro_afiliado: "",
      telefono: "",
      direccion: ""
    },
  })

  const coberturaValue = form.watch("cobertura");
  const isDisabled = coberturaValue === "particular";

 /*  const { mutationPostProfile } = ProfileMutationsService() */


  function onSubmit(values: z.infer<typeof completeProfilePatientSchema>) {
    // mutationPostProfile.mutate(values)
    console.log(values)
  }

  useEffect(() => {
    if (coberturaValue === "particular") {
      form.setValue("obra_social", "");
      form.setValue("nro_afiliado", "");
      console.log(isDisabled);

    }
  }, [coberturaValue, form]);



  return (
    <>
      <Logo />
      <Form {...form} >
        <ContainerMax300>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[1rem] px-[1rem]">
            <TitleSection text="Completá tus datos" />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="dni">D.N.I.</FormLabel>
                  <FormControl>
                    <Input type="text" className="pl-5 bg-[#F2F4F7] placeholder:text-sm" placeholder="XXXXXXXX" id="dni"  {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-[#F2F4F7]" >
                      <SelectValue placeholder="Seleccioná tu género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cobertura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cobertura</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="obra_social" id="obra_social" />
                      <FormLabel htmlFor="obra_social">Obra social</FormLabel>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="particular" id="particular" />
                      <FormLabel htmlFor="particular">Particular</FormLabel>
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />
            {coberturaValue === "obra_social" && (
              <div className="space-y-4 animate-fade-in">
                <FormField
                  control={form.control}
                  name="obra_social"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Obra social</FormLabel>
                      <Input
                        {...field}
                        placeholder="Nombre de la obra social"
                        className="bg-[#F2F4F7] placeholder:text-sm"
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nro_afiliado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de afiliado</FormLabel>
                      <Input
                        {...field}
                        placeholder="Número de afiliado"
                        className="bg-[#F2F4F7] placeholder:text-sm"
                      />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="telefono">Teléfono celular</FormLabel>
                  <FormControl>
                    <Input className="pl-5 bg-[#F2F4F7] placeholder:text-sm" type="text"
                      placeholder="Cod. área + Número sin 15" id="telefono"  {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="direccion">Dirección</FormLabel>
                  <FormControl>
                    <Input className="pl-5 bg-[#F2F4F7] placeholder:text-sm" type="text"
                      placeholder="Direccion" id="direccion"  {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button onClick={() => router.push("/welcome-patient")} className="cursor-pointer">Continuar</Button>
          </form>
        </ContainerMax300>
      </Form>
    </>
  )
}