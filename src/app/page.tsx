"use client";

import { motion } from "framer-motion";
import TerminalBlock from "@/components/TerminalBlock";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          {profile.name}.
        </h1>
        <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed">
          CS Student. Arch Linux Enthusiast. <br />
          <span className="text-emerald-500/80 text-lg md:text-xl font-mono mt-2 block">
             {profile.tagline}
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full"
      >
        <TerminalBlock />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-12 text-xs text-muted/30 font-mono tracking-widest uppercase"
      >
        {profile.os}
      </motion.p>
    </div>
  );
}