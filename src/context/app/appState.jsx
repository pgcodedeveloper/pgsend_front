"use client"
import React, {useReducer} from 'react'
import { MOSTRAR_ALERTA,LIMPIAR_ALERTA,SUBIR_ARCHIVO,CREAR_ENLACE,CARGANDO, LIMPIAR_STATE,AGREGAR_PASSWORD, AGREGAR_DESCARGAS } from '../../../types';
import appContext from './appContext';
import appReducer from './appReducer';
import clienteAxios from '../../../config';

const AppState = ({children}) =>{

    const initialState = {
        mensaje_archivo: null,
        nombre: null,
        nombre_original: null,
        cargando: false,
        descargas: 1,
        password: "",
        autor: null,
        url: ""
    };

    const [state, dispatch] = useReducer(appReducer,initialState);

    //Mostrar una alerta
    const mostrarAlerta = msg =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    //Subir los archivos en el servidor
    const subirArchivo = async(formData, nomOriginal) =>{

        dispatch({
            type: CARGANDO
        });

        try {
            const resultado = await clienteAxios.post('/api/archivos',formData);

            dispatch({
                type: SUBIR_ARCHIVO,
                payload: {nombre: resultado.data.archivo, nombre_original: nomOriginal}
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO,
                payload: {msg: error.response.data.msg}
            });
        }
    }

    //Crear el enlace una vez que el archivo se subio al servidor
    const crearEnlace = async() =>{
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        };

        try {
            const resultado = await clienteAxios.post('/api/enlaces',data);
            dispatch({
                type: CREAR_ENLACE,
                payload: resultado.data.msg
            });

        } catch (error) {
            console.log(error);
        }
    }

    const limpiarState = () =>{
        dispatch({
            type: LIMPIAR_STATE
        });
    }

    //Agregar el password al enlace
    const agregarPassword = password =>{
        if(password){
            dispatch({
                type: AGREGAR_PASSWORD,
                payload: password
            });
        }
    }

    const agregarDescargas = descargas =>{
        if(descargas){
            dispatch({
                type: AGREGAR_DESCARGAS,
                payload: descargas
            });
        }
    }

    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;