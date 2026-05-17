"use client";
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FileText } from 'lucide-react';
import { socials, resume } from '@/lib/data';
import HomeContent from "./content/Home";
import AboutContent from "./content/About";
import WorkContent from "./content/Work";

const navItems = [
  { id: 'home', icon: <Home />, title: '~/home', content: <HomeContent /> },
  { id: 'about', icon: <User />, title: '~/about', content: <AboutContent /> },
  { id: 'work', icon: <Briefcase />, title: '~/work', content: <WorkContent /> },
];

const Navbar = ({ openWindow }: { openWindow: (id: string, title: string, content: React.ReactNode) => void }) => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <div className="flex items-center justify-center p-2 space-x-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => openWindow(item.id, item.title, item.content)}
            whileHover={{ scale: 1.2, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="p-3 text-white rounded-full"
          >
            {item.icon}
          </motion.button>
        ))}
        {socials.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="p-3 text-white rounded-full"
          >
            <social.icon />
          </motion.a>
        ))}
        <motion.a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="p-3 text-white rounded-full"
        >
          <FileText />
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;