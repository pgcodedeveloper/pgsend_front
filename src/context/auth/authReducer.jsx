"use client"
import { REGISTRAR_USUARIO,LIMPIAR_ALERTA,AUTENTICAR_USUARIO, USUARIO_AUTENTICADO,CERRAR_SESION } from "../../../types";

export default (state, action) =>{
    switch(action.type){
        case REGISTRAR_USUARIO:
            return {
                ...state,
                mensaje: action.payload,
            }
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensaje: null
            }
        case AUTENTICAR_USUARIO: 
            //Si es un mensaje de error
            if(action.payload?.texto){
                return{
                    ...state,
                    mensaje: action.payload
                }
            }
            else{
                //Si es autenticar al usuario
                localStorage.setItem('token_pgs',action.payload);
                return{
                    ...state,
                    token: action.payload,
                    autenticado: true
                }
            }
        case USUARIO_AUTENTICADO: 
            return{
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem("token_pgs");
            return{
                ...state,
                usuario: null,
                autenticado: null,
                token: ""
            }
        default: 
            return state;
    }
}