'use client'

import VerifyUser from "@/_components/VerifyUser"

export default function VerifyStep({ userData }: { userData: { email: string, message: string } }) {
  const handleVerify = async (data: { email: string; verificationCode: string }) => {
    const res = await fetch("http://localhost:8080/api/auth/register/verify-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const result = await res.json()
    console.log(result)
  }

  return (
    <div className="flex justify-center flex-col g-max-width w-full mx-auto g-height-page">
      <VerifyUser email={'marivic_05@hotmail.com'} onVerify={handleVerify} />
    </div>)
}