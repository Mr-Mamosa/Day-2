/* src/components/BootScreen.tsx */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLogs = [
  "[    0.000000] Linux version 6.8.9-arch1-1 (linux@archlinux)",
  "[    0.004532] smp: Brought up 1 node, 12 CPUs",
  "[    0.015243] amd_pstate: AMD Ryzen 5 6600H initialized",
  "[    0.231045] nvme nvme0: pci function 0000:04:00.0",
  "[    0.845120] NVRM: loading NVIDIA UNIX x86_64 Kernel Module (RTX 3050)",
  "[    1.450210] systemd[1]: Reached target Graphical Interface.",
  "[    1.602340] wlroots: initialized Wayland backend",
  "[    1.805120] hyprland: mounting UI modules...",
  "[    2.100000] systemd[1]: Startup finished in 2.152s.",
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootLogs.length) {
        setDisplayedLogs((prev) => [...prev, bootLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooting(false);
          setTimeout(onComplete, 100);
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#050505] text-[#ededed] font-mono text-sm p-6 overflow-hidden"
        >
          <div className="flex flex-col space-y-1">
            {displayedLogs.map((log, i) => (
              <div key={i}>
                <span className="text-emerald-500 mr-2">OK</span>
                <span className="text-zinc-400">{log}</span>
              </div>
            ))}
            {displayedLogs.length < bootLogs.length && (
              <span className="w-2 h-4 bg-zinc-400 animate-pulse mt-1 inline-block" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
