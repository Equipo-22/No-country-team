"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { completeProfilePatientSchema } from "@/_schemas/complete-profile-patient";
import ContainerMax300 from "@/components/ui/Container-max300"
import TitleSection from "@/components/ui/TitleSection"
import { useEffect } from "react"
import { ProfileMutationsService } from "@/_service/use-mutation-services/profile-mutation-services"
import { useUserStore } from "@/store/userStore"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { ProfilePayload } from "@/_types/profile-type"




export function CompleteProfilePatient() {

  const { idUser, email, username } = useUserStore()

  const form = useForm<z.infer<typeof completeProfilePatientSchema>>({
    resolver: zodResolver(completeProfilePatientSchema)
    , defaultValues: {
      dni: "",
      fechaNacimiento: undefined as unknown as Date,
      genero: undefined,
      cobertura: "obra_social",
      obraSocial: "",
      numeroAfiliado: "",
      telefono: "",
      direccion: ""
    },

  })

  const coberturaValue = form.watch("cobertura");
  const isDisabled = coberturaValue === "particular";

  const { mutationPostProfile } = ProfileMutationsService()


 function onSubmit(values: z.infer<typeof completeProfilePatientSchema>) {
  const payload: ProfilePayload = {
    userId: idUser,
    nombre: username,
    email,
    dni: values.dni,
    genero: values.genero,
    fechaNacimiento: values.fechaNacimiento
      ? values.fechaNacimiento.toISOString().split("T")[0]
      : "",
    cobertura: values.cobertura,
    telefono: values.telefono,
    direccion: values.direccion,
    obraSocial: values.obraSocial || "",
    numeroAfiliado: values.numeroAfiliado || "",
  };

  mutationPostProfile.mutate(payload);
  console.log(payload);
}

  useEffect(() => {
    if (coberturaValue === "particular") {
      form.setValue("obraSocial", "");
      form.setValue("numeroAfiliado", "");
      console.log(isDisabled);
    }
  }, [coberturaValue, form]);


  return (
    <Form {...form} >
      <ContainerMax300>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4">
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
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaNacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <DatePicker
                    locale={es}
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona DD/MM/AAAA"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    calendarClassName="rounded-xl border border-red-500 shadow-lg bg-red"
                    popperClassName="z-50"
                    className="w-full pl-5 bg-[#F2F4F7] h-10 border-none rounded placeholder:text-muted-foreground "
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="genero"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <FormControl>
                  <Select value={field.value ?? undefined} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-[#F2F4F7] pl-5">
                      <SelectValue placeholder="Seleccioná tu género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {fieldState.error && <FormMessage className="text-xs">{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cobertura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cobertura</FormLabel>
                <FormControl>
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
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {coberturaValue === "obra_social" && (
            <div className="space-y-4 animate-fade-in">
              <FormField
                control={form.control}
                name="obraSocial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Obra social</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nombre de la obra social"
                        className="pl-5 bg-[#F2F4F7] placeholder:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numeroAfiliado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de afiliado</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Número de afiliado"
                        className="pl-5 bg-[#F2F4F7] placeholder:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
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
                <FormMessage className="text-xs" />
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
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">Continuar</Button>
        </form>
      </ContainerMax300>
    </Form>
  )
}