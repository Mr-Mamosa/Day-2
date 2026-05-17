"use client";
import React from "react";
import { motion } from "framer-motion";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export function Spotlight({ children, className }: SpotlightProps) {
  return (
    <div className={`relative group ${className}`}>
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
        style={{
          '--mouse-x': '0px',
          '--mouse-y': '0px',
        } as React.CSSProperties}
      />
      {children}
    </div>
  );
}
