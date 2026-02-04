/* src/app/page.tsx */
"use client";
import { motion } from 'framer-motion';
import TerminalBlock from '@/components/TerminalBlock';
import Navbar from '@/components/Navbar';
import { projects } from '@/lib/data';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.spotlight-card');
      cards.forEach(card => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="container mx-auto px-6 py-20 selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center text-center my-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black tracking-tighter uppercase mb-4"
        >
          Adnan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg max-w-2xl leading-relaxed"
        >
          AI/ML Specialist & Deep Learning Enthusiast exploring the architectural synergy
          between <span className="text-white border-b border-zinc-700">Indian Law</span> and Cognitive Technology.
        </motion.p>
      </section>

      {/* Centerpiece Terminal */}
      <section className="my-24 relative">
        <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full -z-10" />
        <TerminalBlock />
      </section>

      {/* Projects Grid */}
      <section id="projects" className="my-32">
        <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.3em] text-center mb-12 italic">
          // Selected Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="spotlight-card group bg-zinc-950/50 border border-zinc-800 p-8 rounded-2xl transition-all duration-500 hover:border-zinc-500"
            >
              <h3 className="text-xl font-bold mb-3">
                <span className="glitch-text text-white" data-text={project.title}>
                  {project.title}
                </span>
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-mono px-2 py-1 uppercase tracking-tighter rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Navbar />
    </main>
  );
}
