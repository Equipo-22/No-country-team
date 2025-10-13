'use client'

import VerifyUserRegister from "@/_components/VerifyUserRegister"
import { useUserStore } from "@/store/userStore";


export default function page () {

  const { email } = useUserStore();
 return (
    <div className="flex justify-center flex-col g-max-width w-full mx-auto g-height-page">
      <VerifyUserRegister email={email}/>
    </div>)
}