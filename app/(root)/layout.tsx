import { RootLayout } from '@/components/layouts/root'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RootLayout>{children}</RootLayout>
    )
}

export default Layout