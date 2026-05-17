"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import HomeContent from "@/components/content/Home";

type Theme = "dark" | "matrix";

type WindowType = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type WindowContextType = {
  windows: WindowType[];
  openWindow: (id: string, title: string, content: React.ReactNode) => void;
  closeWindow: (id: string) => void;
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
    { id: "home", title: "~/home", content: <HomeContent /> },
  ]);
  const [theme, setTheme] = useState<Theme>("dark");

  const openWindow = useCallback((id: string, title: string, content: React.ReactNode) => {
    setWindows((prev) => {
      if (prev.find((w) => w.id === id)) {
        return prev;
      }
      return [...prev, { id, title, content }];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const closeAllWindows = useCallback(() => {
    setWindows([]);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "matrix" : "dark"));
  }, []);

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, closeAllWindows, theme, toggleTheme }}>
      {children}
    </WindowContext.Provider>
  );
};
