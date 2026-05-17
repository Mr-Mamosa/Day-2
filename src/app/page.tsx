"use client";
import Navbar from "@/components/Navbar";
import WindowManager from "@/components/WindowManager";
import { useWindowManager } from "@/context/WindowManagerContext";

export default function Home() {
  const { openWindow } = useWindowManager();
  return (
    <main>
      <WindowManager />
      <Navbar openWindow={openWindow} />
    </main>
  );
}
