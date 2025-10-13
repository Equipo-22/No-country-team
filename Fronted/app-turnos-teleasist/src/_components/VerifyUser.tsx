"use client"

import { useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { verifyUserSchema } from "@/_schemas/verifyUser-schema"
import Logo from "@/components/ui/Logo"
import TitleSection from "@/components/ui/TitleSection"


type VerificationFormData = z.infer<typeof verifyUserSchema>

interface VerificationCodeProps {
  email: string
  onVerify: (data: VerificationFormData) => void
}

export default function VerifyUser({ email, onVerify }: VerificationCodeProps) {
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

  const onSubmit = (data: VerificationFormData) => {
    onVerify(data)
  }

  return (
    <>
      <Logo />
      <TitleSection text="Verificación de cuenta" />
      <p className="text-sm mb-7">Ingresa el código enviado a tu email</p>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[300px] flex flex-col items-center gap-6">
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
        <Button type="submit" className="w-full max-w-xs">
          Verificar
        </Button>
      </form>
    </>
  )
}
