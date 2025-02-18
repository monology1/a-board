'use client';

import "./globals.css";
import {castoro} from "@/app/lib/fonts";
import {useState, useEffect} from "react";
import {Topbar} from "@/layouts/Topbar";
import {Sidebar} from "@/layouts/Sidebar";

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
    const isAuthPage = window.location.pathname.includes('/signin') ||
        window.location.pathname.includes('/signup');

    if (isAuthPage) {
        return (
            <html lang="en" className={`${castoro.variable}`}>
            <body className="font-castoro">
            {children}
            </body>
            </html>
        );
    }

    return (
        <html lang="en" className={`${castoro.variable}`}>
        <body className="font-castoro">
        <div className="min-h-screen">
            <Topbar
                onMenuClick={() => setSidebarOpen(true)}
                isAuthenticated={isAuthenticated}
            />

            <div className="flex h-[100dvh]">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setSidebarOpen(false)}/>

                <main className="flex-1 max-h-full bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
        </body>
        </html>
    );
}