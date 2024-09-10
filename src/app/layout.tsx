import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/app/components/Header";
import Head from "next/head"; // Import Head for managing metadata and links
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Grad Gig",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Head>
            {/* Corrected link to favicon */}
            <link rel="icon" href="/web-icon.jpg" />
            <meta name="description" content="Grad Gig - Find your dream job" />
            <title>Grad Gig</title>
        </Head>
        <body className={inter.className}>
        <Header />
        {children}
        <footer className="container py-8 text-gray-500">
            Job Board &copy; 2024 - All rights reserved
        </footer>
        </body>
        </html>
    );
}
