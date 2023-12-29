"use client"
import React, {useState, useCallback, use, useContext} from 'react'
import { useDropzone } from "react-dropzone";
import clienteAxios from '../../config';
import appContext from '@/context/app/appContext';
import authContext from '@/context/auth/authContext';
import Formulario from './Formulario';

const Dropzone = () => {

    const AppContext = useContext(appContext);
    const {mostrarAlerta,subirArchivo,cargando,crearEnlace} = AppContext;

    const AuthContext = useContext(authContext);
    const { autenticado, usuario } = AuthContext;

    //Si el archivo no cumple las reglas, no se sube
    const onDropRejected = () =>{
        mostrarAlerta("El archivo es muy pesado, no se pudo subir, obtén una cuenta gratis para subir archivos más grandes");
    }

    //Se ejecuta si el arvhivo cumple las reglas
    const onDropAccepted = useCallback( async(acceptedFiles) =>{
        //Subir el archivo
        const formData = new FormData();
        formData.append("archivo",acceptedFiles[0]);
        subirArchivo(formData, acceptedFiles[0].path);
    },[]);

    //Extraer contenido del dorpzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted,onDropRejected, maxSize: 1000000});

    const archivos = acceptedFiles.map(file => (
        <li key={file.lastModified} className='bg-gray-300 flex-1 p-3 mb-4 shadow-lg rounded-md'>
            <p className='font-bold text-xl text-gray-600'>{file.path}</p>
            <p className='text-sm text-secondary-content font-semibold'>{(file.size / Math.pow(1024,2)).toFixed(2)} MB</p>
        </li>
    ));
    
    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-secondary border-2 bg-gray-600 px-4 rounded-md">

            {acceptedFiles.length > 0 ? (
                <div className='mt-10 w-full'>
                    <h4 className='font-bold text-xl text-center mb-4'>Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>

                    {usuario?.id && (
                        <Formulario />
                    )}

                    <button
                        type='button'
                        className='btn btn-accent btn-md w-full my-10'
                        onClick={() => crearEnlace()}
                    >
                        {cargando ? (
                            <>
                                Subiendo archivo
                                <span className="loading loading-spinner loading-sm"></span>
                            </>
                        ): (
                            "Crear enlace"
                        )}
                    </button>
                </div>
            ): (
                <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                    <input className='h-full' {...getInputProps()}/>

                    {isDragActive ? 
                        <p className='text-2xl text-center text-gray-400'>Suelta el archivo aquí</p>
                    : 
                        <div className='text-center'>
                            <p className='text-2xl text-center text-gray-400'>Selecciona un archivo o arrastralo aquí</p>
                            <button className='btn btn-accent btn-sm w-full my-10'>
                                Seleccionar archivo
                            </button>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default Dropzone
