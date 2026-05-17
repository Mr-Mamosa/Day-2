"use client";
import { useWindowManager } from "@/context/WindowManagerContext";
import { useEffect } from "react";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useWindowManager();
  useEffect(() => {
    document.body.className = `${theme} bg-[#050505] text-white`;
  }, [theme]);
  return <>{children}</>;
};

export default ThemeWrapper;
