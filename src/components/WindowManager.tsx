"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useWindowManager } from "@/context/WindowManagerContext";

const WindowManager = () => {
  const { windows, closeWindow, setWindowActive } = useWindowManager();

  const getGridStyle = () => {
    const numWindows = windows.length;
    if (numWindows === 0) {
      return {};
    }
    if (numWindows === 1) {
      return {
        gridTemplateAreas: `"main"`,
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
      };
    }
    if (numWindows === 2) {
      return {
        gridTemplateAreas: `"main secondary"`,
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
      };
    }
    if (numWindows >= 3) {
      const gridAreas = windows
        .slice(1)
        .map((_, i) => `"main stack${i}"`)
        .join(" ");
      return {
        gridTemplateAreas: gridAreas,
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: `repeat(${numWindows - 1}, 1fr)`,
      };
    }
    return {};
  };

  return (
    <div className="p-4 h-screen">
      <motion.div
        layout
        className="grid gap-4 h-full"
        style={getGridStyle()}
      >
        <AnimatePresence>
          {windows.map((win, index) => {
            let gridArea;
            if (index === 0) {
              gridArea = "main";
            } else if (windows.length === 2) {
              gridArea = "secondary";
            } else {
              gridArea = `stack${index - 1}`;
            }

            return (
              <motion.div
                key={win.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ gridArea }}
                className="h-full"
              >
                <Window
                  title={win.title}
                  onClose={() => closeWindow(win.id)}
                  isActive={win.isActive}
                  onClick={() => setWindowActive(win.id)}
                >
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
