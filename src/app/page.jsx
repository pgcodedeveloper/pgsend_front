"use client"
import authContext from "@/context/auth/authContext"
import Link from "next/link";
import React, { useContext, useEffect } from "react"
import Dropzone from "@/components/Dropzone";
import appContext from "@/context/app/appContext";
import Alerta from "@/components/Alerta";

export default function Home() {
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado } = AuthContext;
    const AppContext = useContext(appContext);
    const { mensaje_archivo,url } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem("token_pgs");

        if(token){
            usuarioAutenticado();
        }
        
    },[]);

    const enlace = process.env.NEXT_PUBLIC_frontendURL + "/enlaces/" + url;
    return (
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
            <div className="flex items-center flex-col justify-center gap-5">
                <p className="text-center text-2xl"> 
                    <span className="font-bold text-primary text-3xl">La URL es: </span>
                    {enlace}
                </p>

                <button
                    type="button"
                    className="btn btn-secondary uppercase w-full"
                    onClick={() => navigator.clipboard.writeText(enlace)}
                >
                    Copiar Enlace
                </button>
            </div>
        ): 
            <>
                <div className="w-full">
                    {
                        mensaje_archivo && <Alerta />
                    }
                </div>
                
                <div className="lg:flex md:shadow-lg p-5  rounded-lg py-10">
                    <Dropzone />
                    <div className="font-sans md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                        <h2 className="text-3xl font-bold text-gray-500 my-4">
                            Comparta archivos de forma sencilla y segura
                        </h2>
                        <p className="text-lg leading-loose">
                            <span className="text-primary font-black">PGSend</span> te permite
                            compartir archivos con cifrado de extremo a extremo y un archivo
                            que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus archivos no permanezcan en línea para siempre
                        </p>
                        <Link legacyBehavior href="/registro">
                            <a className="text-primary font-bold text-lg hover:text-green-300">Si aún no tienes una cuenta, obtén una</a>
                        </Link>
                    </div>
                </div>
            </>
        }
      </div>
    );
}
