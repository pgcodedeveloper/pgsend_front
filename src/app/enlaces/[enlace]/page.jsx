"use client"
import React,{useEffect, useState} from 'react'
import clienteAxios from '../../../../config'
import Link from 'next/link';

export async function getEnlace(enlace){
    try {
        const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
        
        return{
            enlace: resultado.data
        }
    } catch (error) {
        return{
            mensaje: error.response.data.msg
        }
    }
}

export default function Page ({params}) {
    const [enlace, setEnlace] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [alerta,setAlerta] = useState(null);
    const [tienePassword,setTienePassword] = useState(null);
    const [password, setPassword] = useState("");
    const [alertaPass, setAlertaPass] = useState("");

    useEffect(()=>{
        return async() =>{
            setCargando(true);
            try {
                const enl = await getEnlace(params.enlace);
                console.log(enl);
                if(enl.enlace){
                    setTienePassword(enl.enlace.password);
                    setEnlace(enl.enlace.archivo);
                }
                else{
                    setAlerta(enl.mensaje);
                }
                
            } catch (error) {
                console.log(error);
            }
            finally{
                setCargando(false);
            }
        }
    },[]);

    useEffect(() =>{
        if(alertaPass){
            setTimeout(() => {
                setAlertaPass("");
            }, 3000);
        }
    },[alertaPass]);

    const verificarPassword = async e =>{
        e.preventDefault();

        const data = {
            password
        };

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${params.enlace}`,data);
            setTienePassword(resultado.data.password);
            setEnlace(resultado.data.archivo);
        } catch (error) {
            setAlertaPass(error.response.data.msg);
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center gap-8'>
            {!cargando ?(
                <>
                    {tienePassword ? (
                        <>
                            <h2 className='text-3xl text-center text-gray-300'>Este enlace esta protegido con un password, ingreselo a continuación</h2>
                            <div className='w-full max-w-lg'>
                                {
                                    alertaPass && (
                                        <div role="alert" className={`alert alert-error py-2 rounded-md w-full mx-auto mb-4`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p className='font-bold'>{alertaPass}</p>
                                        </div>
                                    )
                                }
                                <form className='bg-gray-200 rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={e => verificarPassword(e)}>
                                    <div className='mb-4'>
                                        <label htmlFor="password" className='block text-gray-600 text-sm font-bold mb-2'>Password</label>
                                        <input
                                            className='input input-ghost placeholder:text-gray-500 appearance-none w-full leading-tight focus:outline-none focus:bg-transparent focus:text-gray-700 text-gray-700' 
                                            type="password" 
                                            name='password' 
                                            id='password' 
                                            placeholder='Ingrese el Password'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>  
                                    <input type="submit" className='btn btn-primary uppercase font-bold w-full' value="Validar Password..."/> 
                                </form>
                            </div>
                        </>
                    ) : (
                        enlace ? (
                            <>
                                <h2 className='text-3xl text-center text-gray-300'>Descarga tu archivo:</h2>

                                <div className='flex items-center justify-normal mt-10 mx-auto'>
                                    <Link legacyBehavior href={{
                                        pathname: `${process.env.backendURL}/api/archivos/${enlace}`
                                    }}>
                                        <a className='btn btn-primary font-bold uppercase'>Descargar archivo</a>
                                    </Link>
                                </div>
                            </>
                        ) : alerta && (
                            <>
                                <div className='flex flex-col items-center justify-normal mt-10 mx-auto gap-4'>
                                    <h2 className='text-3xl text-center text-gray-300 mb-4'>Upps, algo salió mal!</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mood-sad-dizzy w-16 h-16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M14.5 16.05a3.5 3.5 0 0 0 -5 0" />
                                        <path d="M8 9l2 2" />
                                        <path d="M10 9l-2 2" />
                                        <path d="M14 9l2 2" />
                                        <path d="M16 9l-2 2" />
                                    </svg>
                                    <p className='font-sans text-warning font-bold text-xl'>{alerta}</p>

                                    <Link href="/" legacyBehavior>
                                        <a className='btn btn-ghost btn-sm text-primary font-bold text-sm'>
                                            Volver a inicio
                                        </a>
                                    </Link>
                                </div>
                            </>
                        )
                    )}
                </>

                ) : (
                    <p className='flex items-center gap-2'>
                        Obteniendo archivo ... 
                        <span className="loading loading-spinner text-primary"></span>
                    </p>
                )}
            
        </div>
    )
}


