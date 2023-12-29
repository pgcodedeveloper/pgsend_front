import { CARGANDO, CREAR_ENLACE, LIMPIAR_ALERTA, MOSTRAR_ALERTA, SUBIR_ARCHIVO, LIMPIAR_STATE,AGREGAR_PASSWORD, AGREGAR_DESCARGAS } from "../../../types";

export default (state, action) =>{
    switch(action.type){
        case SUBIR_ARCHIVO:
            if(action.payload.msg){
                return{
                    ...state,
                    mensaje_archivo: action.payload.msg,
                    cargando: false
                }
            }
            else{
                return{
                    ...state,
                    nombre: action.payload.nombre,
                    nombre_original: action.payload.nombre_original,
                    cargando: false
                }
            }
            
        case CREAR_ENLACE:
            return{ 
                ...state,
                url: action.payload
            }
        case MOSTRAR_ALERTA:
            return{
                ...state,
                mensaje_archivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensaje_archivo: null
            }
        case CARGANDO: 
            return{
                ...state,
                cargando: true
            }
        case LIMPIAR_STATE: 
            return{
                ...state,
                mensaje_archivo: null,
                nombre: null,
                nombre_original: null,
                cargando: false,
                descargas: 1,
                password: "",
                autor: null,
                url: ""
            }
        case AGREGAR_PASSWORD:
            return{
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return{
                ...state,
                descargas: action.payload
            }
        default: 
            return state;
    }
}