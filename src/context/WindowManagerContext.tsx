"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import HomeContent from "@/components/content/Home";
import InteractiveTerminal from "@/components/InteractiveTerminal";

type Theme = "dark" | "matrix";

type WindowType = {
  id: string;
  title: string;
  content: React.ReactNode;
  isActive: boolean;
};

type WindowContextType = {
  windows: WindowType[];
  activeWindow: string | null;
  openWindow: (id: string, title: string, content: React.ReactNode) => void;
  closeWindow: (id: string) => void;
  closeActiveWindow: () => void;
  focusNextWindow: () => void;
  focusPrevWindow: () => void;
  closeAllWindows: () => void;
  theme: Theme;
  toggleTheme: () => void;
};

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const useWindowManager = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowManager must be used within a WindowProvider");
  }
  return context;
};

export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [windows, setWindows] = useState<WindowType[]>([
    { id: "home", title: "~/home", content: <HomeContent />, isActive: true },
  ]);
  const [activeWindow, setActiveWindow] = useState<string | null>("home");
  const [theme, setTheme] = useState<Theme>("dark");

  const setWindowActive = useCallback((id: string | null) => {
    setActiveWindow(id);
    setWindows(prev => prev.map(w => ({ ...w, isActive: w.id === id })));
  }, []);

  const openWindow = useCallback((id: string, title: string, content: React.ReactNode) => {
    setWindows((prev) => {
      if (prev.find((w) => w.id === id)) {
        setWindowActive(id);
        return prev;
      }
      const newWindow = { id, title, content, isActive: true };
      return [...prev.map(w => ({ ...w, isActive: false })), newWindow];
    });
    setActiveWindow(id);
  }, [setWindowActive]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const index = prev.findIndex(w => w.id === id);
      const newWindows = prev.filter((w) => w.id !== id);
      if (newWindows.length > 0 && activeWindow === id) {
        const newActiveIndex = Math.max(0, index - 1);
        setWindowActive(newWindows[newActiveIndex].id);
      } else if (newWindows.length === 0) {
        setWindowActive(null);
      }
      return newWindows;
    });
  }, [activeWindow, setWindowActive]);

  const closeActiveWindow = useCallback(() => {
    if (activeWindow) {
      closeWindow(activeWindow);
    }
  }, [activeWindow, closeWindow]);

  const focusNextWindow = useCallback(() => {
    if (windows.length < 2) return;
    const activeIndex = windows.findIndex(w => w.id === activeWindow);
    const nextIndex = (activeIndex + 1) % windows.length;
    setWindowActive(windows[nextIndex].id);
  }, [windows, activeWindow, setWindowActive]);

  const focusPrevWindow = useCallback(() => {
    if (windows.length < 2) return;
    const activeIndex = windows.findIndex(w => w.id === activeWindow);
    const prevIndex = (activeIndex - 1 + windows.length) % windows.length;
    setWindowActive(windows[prevIndex].id);
  }, [windows, activeWindow, setWindowActive]);

  const closeAllWindows = useCallback(() => {
    setWindows([]);
    setWindowActive(null);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "matrix" : "dark"));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "q") {
        e.preventDefault();
        closeActiveWindow();
      }
      if (e.altKey && e.key === "h") {
        e.preventDefault();
        focusPrevWindow();
      }
      if (e.altKey && e.key === "l") {
        e.preventDefault();
        focusNextWindow();
      }
      if (e.altKey && e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        const newId = `terminal-${Date.now()}`;
        openWindow(newId, "zsh", <InteractiveTerminal />);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeActiveWindow, focusPrevWindow, focusNextWindow, openWindow]);

  return (
    <WindowContext.Provider value={{ windows, activeWindow, openWindow, closeWindow, closeActiveWindow, focusNextWindow, focusPrevWindow, closeAllWindows, theme, toggleTheme }}>
      {children}
    </WindowContext.Provider>
  );
};
