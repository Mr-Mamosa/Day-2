/* src/components/Navbar.tsx */
"use client";

import { motion } from 'framer-motion';
import { Home, User, Briefcase } from 'lucide-react';
import HomeContent from './content/Home';
import AboutContent from './content/About';
import WorkContent from './content/Work';

interface NavbarProps {
  // We accept the openWindow function as a prop from page.tsx
  openWindow?: (id: string, title: string, content: React.ReactNode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ openWindow }) => {
  const handleOpen = (id: string, title: string, content: React.ReactNode) => {
    if (openWindow) {
      openWindow(id, title, content);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center justify-center p-2 space-x-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl">

        {/* Home App */}
        <button
          onClick={() => handleOpen('home', '~/home', <HomeContent />)}
          className="p-3 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 rounded-xl transition-all duration-300"
          title="Home"
        >
          <Home size={20} />
        </button>

        {/* About App */}
        <button
          onClick={() => handleOpen('about', '~/about', <AboutContent />)}
          className="p-3 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 rounded-xl transition-all duration-300"
          title="System Details"
        >
          <User size={20} />
        </button>

        {/* Work App */}
        <button
          onClick={() => handleOpen('work', '~/work', <WorkContent />)}
          className="p-3 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 rounded-xl transition-all duration-300"
          title="Projects"
        >
          <Briefcase size={20} />
        </button>

      </div>
    </motion.nav>
  );
};

export default Navbar;
