/* src/components/Navbar.tsx */
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, TerminalSquare } from 'lucide-react';
import HomeContent from './content/Home';
import AboutContent from './content/About';
import WorkContent from './content/Work';
import InteractiveTerminal from './InteractiveTerminal';
import { useWindowManager } from '@/context/WindowManagerContext';

const Navbar = () => {
  const { openWindow, windows } = useWindowManager();

  // The dock is centered ONLY when the desktop is completely empty
  const isCentered = windows.length === 0;

  const apps = [
    { id: 'terminal', label: 'Terminal', icon: TerminalSquare, content: <InteractiveTerminal /> },
    { id: 'home', label: 'Home', icon: Home, content: <HomeContent /> },
    { id: 'about', label: 'About', icon: User, content: <AboutContent /> },
    { id: 'work', label: 'Work', icon: Briefcase, content: <WorkContent /> },
  ];

  return (
    <div
      // This wrapper handles the buttery-smooth translation and scaling
      className="fixed inset-x-0 z-[100] flex justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
      style={{
        bottom: isCentered ? "50%" : "2rem",
        transform: isCentered ? "translateY(50%) scale(1.3)" : "translateY(0) scale(1)",
      }}
    >
      <motion.div
        layout
        className="pointer-events-auto flex items-center justify-center p-3 space-x-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <motion.button
              layout
              key={app.id}
              onClick={() => openWindow(app.id, `~/${app.id}`, app.content)}
              className="flex items-center p-3 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/60 rounded-2xl transition-colors duration-300 group"
            >
              <Icon size={22} className="group-hover:scale-110 transition-transform duration-300" />

              {/* Text Labels that gracefully vanish when an app opens */}
              <AnimatePresence>
                {isCentered && (
                  <motion.span
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden whitespace-nowrap text-sm font-medium tracking-wide"
                  >
                    {app.label}
                  </motion.span>
                )}
              </AnimatePresence>

            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Navbar;
