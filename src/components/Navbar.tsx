"use client";

import { motion } from 'framer-motion';
import { Home, User, Briefcase } from 'lucide-react';

const navItems = [
  { href: '#home', icon: <Home /> },
  { href: '#about', icon: <User /> },
  { href: '#projects', icon: <Briefcase /> },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="flex items-center justify-center p-2 space-x-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg">
        {navItems.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            whileHover={{ scale: 1.2, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="p-3 text-white rounded-full"
          >
            {item.icon}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;