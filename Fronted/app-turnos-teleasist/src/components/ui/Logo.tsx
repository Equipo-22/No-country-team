import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <Image
            src='/logo.svg'
            alt="Logo Medihub"
            width={200}
            height={47}
            priority
            className="mb-6"
        />
    )
}

export default Logo
