/* src/app/layout.tsx */
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import MatrixRain from "@/components/MatrixRain";
import { WindowProvider } from "@/context/WindowManagerContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: "Adnan | OS",
  description: "AI/ML Specialist & Deep Learning Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-[#050505] text-white">
        <WindowProvider>
          <ThemeWrapper>
            {/* Z-0: The Rain goes in the very back */}
            <MatrixRain />

            {/* Overlays on top of the rain but behind the windows */}
            <div className="scanline-overlay" />
            <div className="noise-overlay" />

            {/* Global UI */}
            <CommandPalette />

            {/* Z-10: All your content, ThemeWrappers, and Windows go here */}
            <div className="relative z-10 bg-transparent">
              {children}
            </div>
          </ThemeWrapper>
        </WindowProvider>
      </body>
    </html>
  );
}
