"use client";
import { motion } from "framer-motion";
import React from "react";
import { X } from "lucide-react";

const Window = ({ children, title, onClose }: { children: React.ReactNode, title: string, onClose: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-[#111111] border border-zinc-800 rounded-lg flex flex-col overflow-hidden"
      style={{ flex: 1 }}
    >
      <div className="bg-[#1c1c1c] px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
        <span className="text-sm font-mono">{title}</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-white">
          <X size={16} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
