/* src/components/Window.tsx */
import React from "react";
import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ title, onClose, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.2 }}
      // FIX: Changed bg-[#0a0a0a] to bg-[#0a0a0a]/60 and added backdrop-blur-md
      className="flex flex-col flex-1 h-full bg-[#0a0a0a]/60 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl relative"
    >
      {/* OS-Style Title Bar */}
      {/* FIX: Lowered the title bar opacity slightly so it blends nicely */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/30">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {title}
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-3">
          <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
            <Minus size={14} />
          </button>
          <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
            <Square size={12} />
          </button>
          <button
            onClick={onClose}
            className="text-zinc-600 hover:text-red-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
