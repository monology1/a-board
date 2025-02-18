'use client';

import "./globals.css";
import {IBM_Plex_Sans_Thai} from 'next/font/google';
import {castoro} from "@/app/lib/fonts";
import {useState, useEffect} from "react";
import {Topbar} from "@/layouts/Topbar";
import {Sidebar} from "@/layouts/Sidebar";
import { usePathname } from 'next/navigation';

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
    weight: ['400', '500', '600'],
    subsets: ['thai', 'latin'],
    variable: '--font-ibm',
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const userProfile = localStorage.getItem('userProfile');
        setIsAuthenticated(!!userProfile);
    }, []);

    // Check if current path is /signin
    const isSignInPage = pathname === '/signin';

    // Base HTML structure
    const baseHtml = (content: React.ReactNode) => (
        <html lang="en" className={`${castoro.variable} ${ibmPlexSansThai.variable}`}>
        <body className={`font-ibm ${!isSignInPage ? 'bg-gray-100' : ''}`}>
        {content}
        </body>
        </html>
    );

    // Return simple layout for signin page
    if (isSignInPage) {
        return baseHtml(children);
    }

    // Return full layout for other pages
    return baseHtml(
        <div className="min-h-screen flex flex-col">
            <Topbar
                onMenuClick={() => setSidebarOpen(true)}
                isAuthenticated={isAuthenticated}
            />

            <div className="flex flex-1 h-[calc(100vh-3.5rem)]">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className="flex-1 overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}