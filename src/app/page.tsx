/* src/app/page.tsx */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import WindowManager from "@/components/WindowManager";
import { useWindowManager } from "@/context/WindowManagerContext";
import BootScreen from "@/components/BootScreen";

export default function Home() {
  const { openWindow } = useWindowManager();
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <main className="w-full h-screen overflow-hidden">
      {/* 1. Run the kernel boot sequence */}
      {!bootComplete && <BootScreen onComplete={() => setBootComplete(true)} />}

      {/* 2. Load the desktop normally without breaking fixed CSS positions */}
      {bootComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <WindowManager />
          <Navbar openWindow={openWindow} />
        </motion.div>
      )}
    </main>
  );
}
