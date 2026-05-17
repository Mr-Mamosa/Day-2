"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function WorkContent() {
  return (
    <div className="pt-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold mb-12 tracking-tight"
      >
        Selected Work
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={item}
            className="group relative p-6 bg-surface border border-border rounded-xl hover:border-emerald-500/50 transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-2">
                <Link
                  href={project.link}
                  target="_blank"
                  className="p-2 bg-background rounded-full text-muted hover:text-foreground transition-colors"
                >
                  <Github size={18} />
                </Link>
                <Link
                  href={project.link}
                  target="_blank"
                  className="p-2 bg-background rounded-full text-muted hover:text-foreground transition-colors"
                >
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>

            <p className="text-muted leading-relaxed mb-6 h-auto min-h-[4rem]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 8px rgb(16, 185, 129)",
                  }}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-background border border-border text-muted/80"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="absolute inset-0 border border-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
