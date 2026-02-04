import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Adnan | Systems & AI",
  description: "Portfolio of Adnan, an AI/ML Specialist and Arch Linux Enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased min-h-screen relative selection:bg-white selection:text-black">
        <div className="grain-overlay" />
        <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-[-1]" />
        
        <main className="pb-24 pt-10 px-6 md:px-12 max-w-5xl mx-auto">
            {children}
        </main>
        
        <Navbar />
      </body>
    </html>
  );
}