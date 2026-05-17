"use client";

import { motion } from "framer-motion";
import { education, techStack } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  python: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-8.3H6.18l-.01-1.41.09-1.2.22-1.03.34-.85.44-.66.52-.47.58-.3.62-.16.63-.05.61.04.57.12.52.19.45.26.39.31.31.35.24.37.16.39.09.39.03.36.01.31v4.37h6.81v-1.2l-.01-1.21-.09-1.13-.24-1.01-.39-.83-.53-.61-.64-.42-.73-.24-.8-.08-.82.04-.78.14-.72.24-.62.32-.5.4-.36.46-.2.51-.06.52.09.49.21.43.32.34.41.22.49.1.53-.02.53-.13.48-.24.39-.33.28-.4.14-.46.01-.49zM4.36 4.61c.62 0 1.12.51 1.12 1.12 0 .62-.51 1.12-1.12 1.12-.62 0-1.12-.51-1.12-1.12 0-.62.51-1.12 1.12-1.12zm15.28 14.78c-.62 0-1.12.51-1.12 1.12 0 .62.51 1.12 1.12 1.12.62 0 1.12-.51 1.12-1.12 0-.62-.51-1.12-1.12-1.12z" />
    </svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 20.73c2.93-.05 5.56-1.35 6.44-3.13.88-1.78.27-3.9-1.24-5.32-1.51-1.42-3.82-1.75-5.2-1.75-1.38 0-3.69.33-5.2 1.75-1.51 1.42-2.12 3.54-1.24 5.32.88 1.78 3.51 3.08 6.44 3.13zm6.65-4.8c.45.89 1.16 1.48 2.06 1.47 1.25-.01 2.21-1.2 2.22-2.86.01-1.66-1.07-2.61-2.26-2.6-1.19.01-1.77.62-1.77.62L17.5 13.9c.7.4 1.05 1.12 1.15 2.03zM5.35 15.93c-.45.89-1.16 1.48-2.06 1.47-1.25-.01-2.21-1.2-2.22-2.86-.01-1.66 1.07-2.61 2.26-2.6 1.19.01 1.77.62 1.77.62L6.5 13.9c-.7.4-1.05 1.12-1.15 2.03zM12 2.27c2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4s-4-1.79-4-4c0-2.21 1.79-4 4-4z" />
    </svg>
  ),
  vim: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M.012 0h4.425l6.536 16.035L17.566 0h4.422L12.512 24H9.55L.012 0z" />
    </svg>
  ),
  tensorflow: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.97 0L1.73 6.07l.03 9.42L11.97 24l10.27-8.54V6.07L11.97 0zM11 20.61l-7.79-6.4V7.52L11 2.87v17.74zm9.79-6.4l-7.79 6.4V10.1l7.79-4.52v8.63z" />
    </svg>
  ),
  typescript: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM11.5 8h2.5v11h-2.5V8zM5 8h6.5v2.5h-2v8.5H7v-8.5H5V8zm12.5 0h-4v2.5h1.5c.828 0 1.5.672 1.5 1.5v1.5c0 .828-.672 1.5-1.5 1.5h-1.5v-1h1.5v-1.5h-1.5c-.828 0-1.5-.672-1.5-1.5v-1.5c0-.828.672-1.5 1.5-1.5h4V8z"/>
      </svg>
  ),
  nextjs: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
         <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10 0-2.43.863-4.665 2.305-6.425l13.12 16.4C15.865 23.415 14.004 24 12 24zm7.695-3.575L6.575 4.025C8.135 2.585 10.004 2 12 2c5.523 0 10 4.477 10 10 0 2.43-.863 4.665-2.305 6.425z"/>
         <path d="M9.5 7.5l6.5 8.5V7.5h1.5v9h-1.8l-6.5-8.5V16.5H7.7V7.5H9.5z"/>
      </svg>
  ),
  go: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12.2,12.4v3.8h-0.8V12c-0.6-0.1-1.2-0.4-1.2-1.1c0-0.5,0.4-0.9,1.1-0.9c0.7,0,1.1,0.4,1.1,0.9C12.4,11.5,12.4,12,12.2,12.4z M10,6.2c-0.6,0-1,0.4-1,0.9c0,0.5,0.4,0.9,1,0.9c0.6,0,1-0.4,1-0.9C11.1,6.6,10.7,6.2,10,6.2z M18.2,9.3h-1.8V7.8h-1V9.3h-0.9v1h0.9v1.6h1V10.3h1.8v2.1c0,1.6-1.1,2.7-2.8,2.7c-1.7,0-2.8-1.1-2.8-2.7V9.3c0-1.6,1.1-2.7,2.8-2.7c1.7,0,2.8,1.1,2.8,2.7V9.3z M16.4,9.3c0-0.9-0.6-1.6-1.7-1.6c-1.1,0-1.7,0.7-1.7,1.6v2.1c0,0.9,0.6,1.6,1.7,1.6c1.1,0,1.7-0.7,1.7-1.6V9.3z M8.9,14.9v-4H7.2v4.7h5.1v-1.1H8.9z M21.9,11.1c0,1.1-0.3,2.2-0.8,3.2c-1,1.9-2.6,3.4-4.6,4.3C14.5,19.5,12.3,20,10,20c-2.9,0-5.6-1.1-7.6-3.1S-0.7,12.5,0.1,9.6C1,6.8,3.3,4.5,6.1,3.7C9,2.8,12,3.3,14.4,4.9c1.8,1.2,3.2,3,3.9,5.1h-2.1c-0.6-1.5-1.7-2.8-3.1-3.6c-1.8-1-4-0.8-5.6,0.4C5.9,8,5.1,9.9,5.5,11.8c0.4,1.9,2,3.5,4,4c2.2,0.5,4.4-0.4,5.8-2.2c0.6-0.8,0.9-1.8,0.9-2.7H14v-1.9h7.9V11.1z"/>
    </svg>
  )
};

export default function About() {
  return (
    <div className="pt-12 space-y-16">
      
      {/* Education Section */}
      <section>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold mb-8 tracking-tight"
        >
          Education
        </motion.h2>

        <div className="border-l-2 border-border ml-2 space-y-8">
            {education.map((edu, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative pl-8"
                >
                    <div className="absolute top-1.5 -left-[9px] w-4 h-4 rounded-full bg-background border-2 border-emerald-500" />
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <p className="text-emerald-500 font-mono mb-2">{edu.institution} | {edu.year}</p>
                    <p className="text-muted">{edu.details}</p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section>
        <motion.h2 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="text-4xl font-bold mb-8 tracking-tight"
        >
          Tech Stack
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
                <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-6 bg-surface border border-border rounded-xl hover:bg-white/5 transition-colors group cursor-default"
                >
                    <div className="mb-4 text-muted group-hover:text-foreground transition-colors">
                        {icons[tech.icon] || <div className="w-8 h-8 bg-gray-500 rounded" />}
                    </div>
                    <span className="font-mono text-sm text-muted group-hover:text-emerald-400">{tech.name}</span>
                </motion.div>
            ))}
        </div>
      </section>

    </div>
  );
}
