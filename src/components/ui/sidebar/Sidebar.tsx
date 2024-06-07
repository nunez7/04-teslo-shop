'use client';

import { logout } from '@/actions';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    const { data: session } = useSession();

    const isAthenticated = !!session?.user;

    const isAdmin = session?.user.role === "admin";
    //console.log("isAthenticated ", isAthenticated);
    //Fix para cerrar sesión
    const cerrarSesion = async() => {
        await logout();
        closeMenu();
        window.location.replace("/");
    }
    return (
        <div>
            {/* Back black*/}
            {
                isSideMenuOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
                )
            }

            {/* Blur */}
            {isSideMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                />
            )}

            {/* Sidemenu */}
            <nav
                className={
                    clsx(
                        "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }>
                <IoCloseOutline
                    size={50}
                    className='absolute top-5 right-5 cursor-pointer'
                    onClick={() => closeMenu()}
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
                {
                    isAthenticated && (
                        <>
                            <Link
                                href="/profile"
                                onClick={() => closeMenu()}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoPersonOutline size={30} />
                                <span className='ml-4 text-xl'>Perfil</span>
                            </Link>

                            <Link
                                href="/orders"
                                onClick={() => closeMenu()}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoTicketOutline size={30} />
                                <span className='ml-4 text-xl'>Ordenes</span>
                            </Link>
                        </>
                    )
                }
                {
                    isAthenticated && (
                        <button
                            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            onClick={() => cerrarSesion()}
                        >
                            <IoLogOutOutline size={30} />
                            <span className="ml-3 text-xl">Salir</span>
                        </button>
                    )
                }
                {!isAthenticated && (
                    <Link
                        href="/auth/login"
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoLogInOutline size={30} />
                        <span className='ml-4 text-xl'>Ingresar</span>
                    </Link>
                )
                }

                {/* Line separator */}
                {
                    isAdmin && (

                        <>
                            <div className='w-full h-px bg-gray-200 my-10' />
                            <Link
                                href="/admin/products"
                                onClick={() => closeMenu()}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoShirtOutline size={30} />
                                <span className='ml-4 text-xl'>Productos</span>
                            </Link>
                            <Link
                                href="/admin/orders"
                                onClick={() => closeMenu()}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoTicketOutline size={30} />
                                <span className='ml-4 text-xl'>Ordenes</span>
                            </Link>
                            <Link
                                href="/admin/users"
                                onClick={() => closeMenu()}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoPeopleOutline size={30} />
                                <span className='ml-4 text-xl'>Usuarios</span>
                            </Link>
                        </>
                    )
                }

            </nav>
        </div>
    )
}