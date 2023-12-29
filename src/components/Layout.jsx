"use client"
import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <div className=''>
                <div className='container mx-auto'>
                    
                    <main className='mt-20'>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout
