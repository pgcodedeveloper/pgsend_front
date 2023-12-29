"use client"
import appContext from '@/context/app/appContext';
import authContext from '@/context/auth/authContext'
import React, { useContext } from 'react'


const Alerta = () => {
    const AuthContext = useContext(authContext);
    const { mensaje } = AuthContext;
    const AppContext = useContext(appContext);
    const { mensaje_archivo } = AppContext;

    

    return (
        <>
            {mensaje_archivo ? (
                <div role="alert" className={`alert alert-error py-2 rounded-md w-full mx-auto`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className='font-bold'>{mensaje_archivo}</p>
                </div>
            ): (
                <div role="alert" className={`alert ${mensaje?.tipo === "Exito" ? "alert-success" : "alert-error"} py-2 rounded-md max-w-lg mx-auto`}>
                    {mensaje?.tipo === "Exito" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ): (
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    <p className='font-bold'>{mensaje?.texto}</p>
                </div>
            )}
        </>
    )
}

export default Alerta
