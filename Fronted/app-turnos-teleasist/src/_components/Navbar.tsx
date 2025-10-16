import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'

export const Navbar = () => {
    return (
        <nav className='flex w-full h-[10vh]  items-center bg-[#fff] p-[1rem] '>
            <div className='flex gap-2 items-center w-full justify-end'>
                <IoIosNotificationsOutline className='h-auto w-[2rem]' />
                <div className='flex justify-around'>
                    <img className='rounded-full h-auto w-[30px]'
                        src={"/person.png"}
                        alt={"imagen"} />
                </div>
                <div className='flex flex-col'>
                    <p>nombre</p>
                    <p>mail</p>
                </div>
            </div>
        </nav>
    )
}
