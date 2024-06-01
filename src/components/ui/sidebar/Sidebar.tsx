'use client';

import Link from 'next/link';
import React from 'react';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar = () => {
    return (
        <div className=''>
            {/* Back black*/}
            <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />

            {/* Blur */}
            <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />

            {/* Sidemenu */}
            <nav
                // todo: sfecto de slide
                className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">
                <IoCloseOutline
                    size={50}
                    className='absolute top-5 right-5 cursor-pointer'
                    onClick={() => console.log("Click")}
                />
                {/* Input */}
                <div className='relative mt-14'>
                    <IoSearchOutline size={20} className='absolute top-2 left-2' />
                    <input type="text"
                        placeholder='Buscar'
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                    />
                </div>

                {/* Menú opciones */}
                <Link
                    href="/"
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoPersonOutline size={30} />
                    <span className='ml-4 text-xl'>Perfil</span>
                </Link>

                <Link
                    href="/orders"
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoTicketOutline size={30} />
                    <span className='ml-4 text-xl'>Ordenes</span>
                </Link>

                <Link
                    href="/signin"
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoLogInOutline size={30} />
                    <span className='ml-4 text-xl'>Ingresar</span>
                </Link>

                <Link
                    href="/logout"
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoLogOutOutline size={30} />
                    <span className='ml-4 text-xl'>Salir</span>
                </Link>
                {/* Line separator */}
                <div className='w-full h-px bg-gray-200 my-10' />

                <Link
                    href="/products"
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoShirtOutline size={30} />
                    <span className='ml-4 text-xl'>Productos</span>
                </Link>

                <Link
                    href="/orders"
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoTicketOutline size={30} />
                    <span className='ml-4 text-xl'>Ordenes</span>
                </Link>

                <Link
                    href="/users"
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoPeopleOutline size={30} />
                    <span className='ml-4 text-xl'>Usuarios</span>
                </Link>

            </nav>
        </div>
    )
}