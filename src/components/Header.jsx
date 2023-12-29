"use client"
import Link from 'next/link'
import React,{useContext,useEffect} from 'react'
import authContext from '@/context/auth/authContext'
import appContext from '@/context/app/appContext'
import { useRouter } from 'next/navigation'

const Header = () => {
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado,usuario,cerrarSesion } = AuthContext;

    const AppContext = useContext(appContext);
    const { limpiarState } = AppContext;

    const router = useRouter();

    useEffect(() =>{
        usuarioAutenticado();
    },[]);

    const handleCerrarSesion = async() =>{
       await cerrarSesion();
    }

    const reedirecionar = () =>{
        router.push("/");
        limpiarState();
    }
    return (
        <header className='font-sans sm:px-2 py-8 flex flex-col md:flex-row items-center justify-between'>
            <button 
                onClick={() => reedirecionar()}
            >
                <h1 className='text-2xl mb-8 md:mb-0 text-primary font-bold'>PG<span className='text-3xl italic font-black text-secondary'>SEND</span></h1>
            </button>
            
            <div className='flex items-center gap-2'>
                {
                    usuario ? (
                        <div className='flex items-center gap-2'>
                            <p className='text-gray-500'>Hola <span className='font-bold text-secondary'>{usuario.nombre}</span></p>
                            <button type='button' onClick={handleCerrarSesion} className='btn btn-sm btn-primary text-black font-bold uppercase'>
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" legacyBehavior>
                                <a className='btn btn-sm btn-secondary text-white font-bold uppercase'>Iniciar Sesión</a>
                            </Link>
                            <Link href="/registro" legacyBehavior>
                                <a className='btn btn-sm btn-primary text-black font-bold uppercase'>Crear Cuenta</a>
                            </Link>
                        </>
                    )
                }
                
            </div>
        </header>
    )
}

export default Header
