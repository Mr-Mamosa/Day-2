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
        const rect = card.getBoundingClientRect();
        card.setAttribute('style', `--mouse-x: ${e.clientX - rect.left}px; --mouse-y: ${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-16">
      <section id="home" className="text-center my-16">
        <h1 className="text-4xl font-bold">Adnan</h1>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          "AI/ML Specialist & Deep Learning Enthusiast exploring the architectural synergy between Indian Law and Cognitive Technology."
        </p>
      </section>

      <section className="my-16">
        <TerminalBlock />
      </section>

      <section id="about" className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="max-w-3xl mx-auto">
          "Third-year Computer Science student. Driven by first-principles reimplementation of research papers and system-level control via Arch Linux."
        </p>
      </section>

      <section id="projects" className="my-16">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="spotlight-card bg-[#1a1a1a] p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2">
                <span className="glitch-text" data-text={project.title}>
                  {project.title}
                </span>
              </h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-blue-900/50 text-blue-300 text-xs font-mono px-2 py-1 rounded">
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