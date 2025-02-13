import type {Metadata} from "next";
import "./globals.css";
import { castoro } from "@/app/lib/fonts";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${castoro.variable}`}>
        <body
            className="font-castoro"
        >
        {children}
        </body>
        </html>
    );
}
