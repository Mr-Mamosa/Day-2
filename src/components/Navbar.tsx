"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/work", label: "Work", icon: Briefcase },
  { href: "/about", label: "About", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 rounded-full bg-surface/80 backdrop-blur-md border border-border shadow-2xl">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className="relative">
              <div
                className={cn(
                  "p-3 rounded-full transition-all duration-300 flex items-center justify-center relative group",
                  isActive ? "text-background bg-foreground" : "text-muted hover:text-foreground hover:bg-white/10"
                )}
              >
                <link.icon size={20} />
                {isActive && (
                    <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-full bg-foreground -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
                
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface border border-border rounded text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {link.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
