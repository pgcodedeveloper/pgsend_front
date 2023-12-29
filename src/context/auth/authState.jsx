"use client"
import React, {useReducer} from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { REGISTRAR_USUARIO,LIMPIAR_ALERTA,AUTENTICAR_USUARIO, USUARIO_AUTENTICADO,CERRAR_SESION } from "../../../types";

import clienteAxios from "../../../config";
import tokenAuth from "../../../config/tokenAuth";

const AuthState = ({children}) =>{
    
    //State inicial
    const initialState = {
        token: typeof localStorage !== "undefined" ? localStorage.getItem("token_pgs") : "",
        autenticado: null,
        usuario: null,
        mensaje: null
    }
    //Definir el reducer
    const [state, dispatch] = useReducer(authReducer,initialState);

    //Registrar nuevos usuarios al sistema
    const registrarUsuario = async (user) =>{
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',user);
            const {data} = respuesta;
            dispatch({
                type: REGISTRAR_USUARIO,
                payload: {texto: data.msg, tipo: "Exito"}
            });

            
        } catch (error) {
            const {data} = error.response;
            dispatch({
                type: REGISTRAR_USUARIO,
                payload: {texto: data.msg, tipo: "Error"}
            });
        }
        finally{
            //Limpiar la alerta despues de 3 segundos
            setTimeout(() =>{
                dispatch({
                    type: LIMPIAR_ALERTA
                });
            },3000);
        }
    }

    //Autenticar el usuario
    const autenticarUsuario = async (user) =>{
        try {
            const respuesta = await clienteAxios.post('/api/auth',user);
            const {data} = respuesta;
            dispatch({
                type: AUTENTICAR_USUARIO,
                payload: data.token
            });
        } catch (error) {
            const {data} = error.response;
            dispatch({
                type: AUTENTICAR_USUARIO,
                payload: {texto: data.msg, tipo: "Error"}
            });
        }
        finally{
            //Limpiar la alerta despues de 3 segundos
            setTimeout(() =>{
                dispatch({
                    type: LIMPIAR_ALERTA
                });
            },3000);
        }
    }

    //Cerrar la sesión actual del usuario
    const cerrarSesion = async () =>{
        dispatch({
            type: CERRAR_SESION
        });
    }

    //Retorna el usuario autenticado en base al JWT
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem("token_pgs");
        if(token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get("/api/auth");
            const {usuario} = respuesta.data;
            if(usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: usuario
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                autenticarUsuario,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;