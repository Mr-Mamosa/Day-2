"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useWindowManager } from "@/context/WindowManagerContext";

const WindowManager = () => {
  const { windows, closeWindow } = useWindowManager();

  return (
    <div className="p-4 h-screen flex flex-col">
      <motion.div layout className="flex gap-4 flex-1">
        <AnimatePresence>
          {windows.map((win) => (
            <Window key={win.id} title={win.title} onClose={() => closeWindow(win.id)}>
              {win.content}
            </Window>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WindowManager;
