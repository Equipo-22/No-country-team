"use client"

import ContainerMax300 from '@/components/ui/Container-max300'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type SuccessProps = {
  text: string
  buttonText: string
  redirect?: string
  onClick?: () => void
}

const Success = ({ text, buttonText, redirect, onClick }: SuccessProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick() 
    } else if (redirect) {
      router.push(redirect)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <Image
        src="/success.svg"
        alt="success_icon"
        width={63}
        height={63}
      />
      <ContainerMax300>
        <p className="text-center text-lg pb-4">{text}</p>
        <Button
          onClick={handleClick}
          className="cursor-pointer mx-4 mt-4"
          variant="outline"
        >
          {buttonText}
        </Button>
      </ContainerMax300>
    </div>
  )
}

export default Success
