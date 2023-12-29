"use client"
import appContext from '@/context/app/appContext';
import React, { useContext, useState } from 'react'

const Formulario = () => {

    const AppContext = useContext(appContext);
    const { agregarPassword,agregarDescargas } = AppContext;

    const [withPassword, setWithPassword] = useState(false);
    return (
        <div className='w-full mt-10'>
            <div>
                <label htmlFor='descargas' className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Eliminar tras: </span>
                    </div>
                    <select 
                        id='descargas' 
                        className="select select-bordered select-ghost bg-gray-600 leading-none focus:outline-none focus:bg-gray-600 text-gray-300"
                        onChange={(e) => agregarDescargas(+e.target.value)}
                    >
                        <option disabled selected value={""}>-- Seleccione --</option>
                        <option value={"1"}>1 Descarga</option>
                        <option value={"5"}>5 Descargas</option>
                        <option value={"10"}>10 Descargas</option>
                        <option value={"20"}>20 Descargas</option>
                    </select>
                </label>
            </div>

            <div className='mt-4'>
                <div className="form-control">
                    <label htmlFor='password' className="label cursor-pointer">
                        <span className="label-text">Proteger con Password</span> 
                        <input type="checkbox" id='password' className="checkbox checkbox-primary" onChange={() => setWithPassword(!withPassword)}/>
                    </label>
                </div>

                { withPassword && (
                    <input 
                        type="password" 
                        placeholder="Ingrese password" 
                        className="input input-bordered input-md w-full bg-gray-600 leading-none focus:outline-none focus:bg-gray-600 text-gray-300" 
                        onChange={e => agregarPassword(e.target.value)}
                    />
                )}
                
            </div>
        </div>
    )
}

export default Formulario
