import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { WindowProvider } from "@/context/WindowManagerContext";
import CommandPalette from "@/components/CommandPalette";
import ThemeWrapper from "@/components/ThemeWrapper";

export const metadata: Metadata = {
  title: "Adnan",
  description: "AI/ML Specialist & Deep Learning Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <WindowProvider>
          <ThemeWrapper>
            <div className="scanline-overlay" />
            <div className="noise-overlay" />
            <div className="aurora-effect" />
            {children}
            <CommandPalette />
          </ThemeWrapper>
        </WindowProvider>
      </body>
    </html>
  );
}