import React from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
