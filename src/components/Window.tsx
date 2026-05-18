/* src/components/Window.tsx */
import React from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ title, onClose, children }) => {
  return (
    <div className="flex flex-col w-full h-full bg-[#0a0a0a]/60 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl relative">

      {/* OS Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/40 shrink-0">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar text-zinc-100">
        {children}
      </div>
    </div>
  );
};

export default Window;
