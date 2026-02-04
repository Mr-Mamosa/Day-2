"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const asciiLogo = `
   /\
  /  \
 /    \
/______\
  |  |
`;

const lines = [
  { label: "OS", value: profile.stats.os },
  { label: "Host", value: "arch-linux" },
  { label: "Kernel", value: "6.8.9-arch1-1" },
  { label: "Uptime", value: profile.stats.uptime },
  { label: "Shell", value: profile.stats.shell },
  { label: "Theme", value: profile.stats.theme },
  { label: "Font", value: "Geist Mono" },
];

export default function TerminalBlock() {
  const [typedLines, setTypedLines] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedLines((prev) => (prev < lines.length + 2 ? prev + 1 : prev));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-12 font-mono text-sm md:text-base p-6 rounded-lg bg-surface border border-border shadow-2xl overflow-hidden relative group">
      {/* Terminal Controls */}
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ASCII Art */}
        <div className="hidden md:block text-emerald-500 font-bold select-none leading-tight">
          <pre>{asciiLogo}</pre>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1">
          <div className="flex gap-2">
            <span className="text-emerald-500">adnan@archlinux</span>
            <span className="text-muted">~</span>
          </div>
          
          <div className="my-2 border-t border-dashed border-border w-full" />

          {lines.map((line, index) => (
             <motion.div
                key={line.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: typedLines > index ? 1 : 0, x: typedLines > index ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4"
             >
                <span className="text-emerald-500 min-w-[80px] font-bold">{line.label}:</span>
                <span className="text-muted">{line.value}</span>
             </motion.div>
          ))}
          
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: typedLines > lines.length ? 1 : 0 }}
             className="pt-2 flex gap-2 animate-pulse"
           >
              <span className="text-emerald-500">➜</span>
              <span className="text-foreground">_</span>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
