import { Inter } from 'next/font/google'
import './globals.css'
import AuthState from '@/context/auth/authState'
import AppState from '@/context/app/appState'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PGSend',
  description: 'Comparte tus archivos de forma segura y rápida',
}

export default function RootLayout({ children }) {
    
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthState>
                    <AppState>
                        <Layout>
                            {children}
                        </Layout>
                    </AppState>
                </AuthState>
            </body>
        </html>
    )
}
