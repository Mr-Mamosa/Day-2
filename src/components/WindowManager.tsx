/* src/components/WindowManager.tsx */
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useWindowManager } from "@/context/WindowManagerContext";

const WindowManager = () => {
  const { windows, closeWindow } = useWindowManager();

  const getGridStyle = () => {
    const num = windows.length;
    if (num <= 1) return {}; // 1 Window = Full Screen
    if (num === 2) return { gridTemplateColumns: "1fr 1fr" }; // 2 Windows = 50/50 Split

    // 3+ Windows = Master on Left, Stacked on Right
    const gridAreas = windows.slice(1).map((_, i) => `"main stack${i}"`).join(" ");
    return {
      gridTemplateAreas: gridAreas,
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: `repeat(${num - 1}, 1fr)`,
    };
  };

  return (
    <div className="w-full h-screen flex flex-col p-6 transition-all duration-700 pb-28">
      <motion.div
        layout
        className="w-full max-w-[1800px] mx-auto flex-1 min-h-0 grid gap-4"
        style={getGridStyle()}
      >
        <AnimatePresence>
          {windows.map((win, index) => {
            const gridArea = index === 0 ? "main" : `stack${index - 1}`;

            return (
              <motion.div
                key={win.id}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="w-full h-full min-h-0"
                style={windows.length > 2 ? { gridArea } : {}}
              >
                <Window title={win.title} onClose={() => closeWindow(win.id)}>
                  {win.content}
                </Window>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WindowManager;
