"use client"
import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '@/context/auth/authContext';
import Alerta from '@/components/Alerta';
import { useRouter } from 'next/navigation';
const Login = () => {
    const route = useRouter();

    //Obtener el context
    const AuthContext = useContext(authContext);
    const { mensaje, autenticado ,autenticarUsuario } = AuthContext;
    useEffect(() =>{
        if(autenticado){
            route.push("/");
        }
    },[autenticado]);

    const handleSubmit = async (valores) =>{
        await autenticarUsuario(valores);
    }
    //Formulario y validacion con formik y Yup
    const formik = useFormik({
        initialValues:{
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                        .email("El email no es válido")
                        .required("El email es obligatorio"),
            password: Yup.string()
                        .required("El password es obligatorio")
        }),
        onSubmit: handleSubmit,
    });

    return (
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
            <h2 className='text-4xl font-sans font-bold text-gray-200 text-center my-4'>Iniciar Sesión</h2>

            {mensaje && <Alerta />}

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form action="" className='bg-gray-200 rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-600 text-sm font-bold mb-2'>Email</label>
                            <input 
                                value={formik.values.email} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                className='input input-ghost placeholder:text-gray-500 appearance-none w-full leading-tight focus:outline-none focus:bg-transparent focus:text-gray-700 text-gray-700' 
                                type="email" 
                                name='email' 
                                id='email' 
                                placeholder='Ingrese su Email'
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div role="alert" className="alert alert-error my-2 py-2 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className='font-bold'>{formik.errors.email}</p>
                                </div>
                            ): null}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-600 text-sm font-bold mb-2'>Password</label>
                            <input 
                                value={formik.values.password} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                className='input input-ghost placeholder:text-gray-500 appearance-none w-full leading-tight focus:outline-none focus:bg-transparent focus:text-gray-700 text-gray-700' 
                                type="password" 
                                name='password' 
                                id='pasword' 
                                placeholder='Ingrese su Password'
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div role="alert" className="alert alert-error my-2 py-2 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className='font-bold'>{formik.errors.password}</p>
                                </div>
                            ): null}
                        </div>

                        <input type="submit" className='btn btn-primary uppercase font-bold w-full' value="Ingresar"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
