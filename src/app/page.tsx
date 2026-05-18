/* src/app/page.tsx */
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import WindowManager from "@/components/WindowManager";
import BootScreen from "@/components/BootScreen";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <main className="w-full h-screen overflow-hidden relative">
      {/* 1. Run the boot sequence */}
      {!bootComplete && <BootScreen onComplete={() => setBootComplete(true)} />}

      {/* 2. Load the completely empty desktop with the dock */}
      {bootComplete && (
        <div className="w-full h-full animate-in fade-in duration-700">
          <WindowManager />
          <Navbar />
        </div>
      )}
    </main>
  );
}
