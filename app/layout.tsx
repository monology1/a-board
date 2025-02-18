'use client';

import "./globals.css";
import {IBM_Plex_Sans_Thai} from 'next/font/google';
import {castoro} from "@/app/lib/fonts";
import {useState, useEffect} from "react";
import {Topbar} from "@/layouts/Topbar";
import {Sidebar} from "@/layouts/Sidebar";

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

    useEffect(() => {
        const userProfile = localStorage.getItem('userProfile');
        setIsAuthenticated(!!userProfile);
    }, []);

    // Filter out authentication pages
    const isAuthPage = typeof window !== 'undefined' &&
        (window.location.pathname.includes('/signin') || window.location.pathname.includes('/signup'));

    if (isAuthPage) {
        return (
            <html lang="en" className={`${castoro.variable} ${ibmPlexSansThai.variable}`}>
            <body className="font-ibm">
            {children}
            </body>
            </html>
        );
    }

    return (
        <html lang="en" className={`${castoro.variable} ${ibmPlexSansThai.variable}`}>
        <body className="font-ibm bg-gray-100">
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
        </body>
        </html>
    );
}