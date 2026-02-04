"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const neofetchOutput = [
  "OS: Arch Linux x86_64",
  "Host: Gaming Laptop",
  "Kernel: 6.8.9-arch1-1",
  "Uptime: 3 years",
  "Shell: Zsh (Vim Mode)",
  "Resolution: 1920x1080",
];

const TerminalBlock = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;
    let interval: NodeJS.Timeout;

    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setLines((prev) => {
          // Stop when all lines are printed
          if (index >= neofetchOutput.length) {
            clearInterval(interval);
            return prev;
          }

          const nextLine = neofetchOutput[index];
          index++;

          return [...prev, nextLine];
        });
      }, 150);
    }, 800);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="w-full max-w-md mx-auto bg-[#0a0a0a] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between p-3 bg-zinc-900/50 border-b border-zinc-800 cursor-grab active:cursor-grabbing">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#ff5f56] rounded-full shadow-inner" />
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full shadow-inner" />
          <div className="w-3 h-3 bg-[#27c93f] rounded-full shadow-inner" />
        </div>

        <div className="flex items-center text-zinc-400 font-mono text-xs tracking-widest uppercase">
          <Terminal size={14} className="mr-2 opacity-50" />
          zsh — 80x24
        </div>

        <div className="w-12" />
      </div>

      {/* Body */}
      <div className="p-6 font-mono text-xs sm:text-sm text-left min-h-[220px]">
        {/* Command line */}
        <div className="flex items-center gap-2">
          <span className="text-[#98c379]">➜</span>
          <span className="text-[#61afef]">~</span>
          <span className="text-zinc-100">neofetch</span>

          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-zinc-400"
          />
        </div>

        {/* Output */}
        <div className="mt-4 space-y-1.5">
          {lines.map((line, index) => {
            if (!line) return null; // safety guard

            const [label, value] = line.split(": ");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex"
              >
                <span className="text-[#c678dd] font-bold w-28 shrink-0">
                  {label}:
                </span>

                <span className="text-zinc-300">{value}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalBlock;
