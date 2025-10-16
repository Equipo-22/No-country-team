'use client'

import VerifyUserRegister from "@/_components/VerifyUserRegister"
import { useUserStore } from "@/store/userStore";


export default function page() {

  const { email } = useUserStore();
  return (
    <VerifyUserRegister email={email} />
  )
}