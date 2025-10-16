'use client'

import VerifyUserLogin from "@/_components/VerifyUserLogin"
import { useUserStore } from "@/store/userStore";


export default function page() {

  const { email } = useUserStore();
  return (
    <VerifyUserLogin email={email} />
  )
}