"use client"

import { useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { verifyUserSchema } from "@/_schemas/verifyUser-schema"
import Logo from "@/components/ui/Logo"
import TitleSection from "@/components/ui/TitleSection"
import { VerifyUserType } from "@/_types/verifyUser-type"
import { VerifyUserMutationService } from "@/_service/use-mutation-services/verifyUser_mutation-services"


type VerificationFormData = z.infer<typeof verifyUserSchema>


export default function VerifyUserLogin({ email }: { email: string }) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: { email, verificationCode: "" },
  })

  const { mutationPostVerifyUserLogin } = VerifyUserMutationService()

  const inputsRef = useRef<HTMLInputElement[]>([])
  const code = watch("verificationCode").padEnd(6, " ")

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return

    const newCode =
      code.substring(0, index) + value + code.substring(index + 1)
    setValue("verificationCode", newCode.trim())

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleVerify = (data: VerifyUserType) => {
    mutationPostVerifyUserLogin.mutate(data)
  }

  const onSubmit = (data: VerificationFormData) => {
    console.log("hizo click");    
    handleVerify(data)
  }

  

  return (
    <>
      <Logo />
      <TitleSection text="Validación de usuario" />
      <p className="text-sm">Ingresa el código enviado a</p><span className="font-semibold mb-7">{email}</span>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[300px] flex flex-col items-center gap-6">
         <input type="hidden" {...control.register("email")} value={email} />
        <Controller
          name="verificationCode"
          control={control}
          render={() => (
            <div className="flex gap-2">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    placeholder="-"
                    value={code[index] && code[index] !== " " ? code[index] : ""}
                    ref={(el) => { if (el) inputsRef.current[index] = el }}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`w-10 h-14 text-center text-xl border rounded-lg outline-none 
                    ${errors.verificationCode
                        ? "border-destructive focus:ring-destructive"
                        : "border-gray-300 focus:border-primary focus:ring-primary"
                      } focus:ring-1`}
                  />
                ))}
            </div>
          )}
        />
        {errors.verificationCode && (
          <p className="text-destructive text-xs">{errors.verificationCode.message}</p>
        )}
        {mutationPostVerifyUserLogin.isError && (
          <p className="text-destructive text-sm mt-2">
            Error al verificar el usuario
          </p>
        )}
        <Button type="submit" className="w-full max-w-xs">
          {mutationPostVerifyUserLogin.isPending ? "Verificando..." : "Verificar"}
        </Button>
      </form>
    </>
  )
}
