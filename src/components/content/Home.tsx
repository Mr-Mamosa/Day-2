/* src/components/content/Home.tsx */
"use client";
import { motion } from 'framer-motion';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import { projects, socials, resume } from '@/lib/data';
import { useEffect } from 'react';
import LiveActivity from '../LiveActivity';

export default function HomeContent() {
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="text-6xl font-black tracking-tighter uppercase mb-4"
          >
            Adnan
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="text-zinc-400 text-lg max-w-2xl leading-relaxed"
          >
            AI/ML Specialist & Deep Learning Enthusiast exploring the architectural synergy
            between <span className="text-white border-b border-zinc-700">Indian Law</span> and Cognitive Technology.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
            }}
            className="flex gap-4 mt-8 justify-center"
          >
            <motion.a
              href={socials.find(s => s.name === 'GitHub')?.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg"
            >
              View GitHub
            </motion.a>
            <motion.a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/10 text-white border border-zinc-700 rounded-lg"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Live Activity Section */}
      <section className="my-24">
        <LiveActivity />
      </section>

      {/* Centerpiece Terminal */}
      <section className="my-24 relative">
        <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full -z-10" />
        <InteractiveTerminal />
      </section>

      {/* Projects Grid */}
      <section id="projects" className="my-32">
        <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.3em] text-center mb-12 italic">
          // Selected Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <a key={index} href={project.link} target="_blank" rel="noopener noreferrer">
            <motion.div
              
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
            </a>
          ))}
        </div>
      </section>

      
      {/* Contact Section */}
      <section id="contact" className="my-32 text-center">
        <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.3em] mb-4 italic">
          // Get In Touch
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-zinc-400 max-w-lg mx-auto leading-relaxed mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out.
          </p>
          <motion.a
            href="mailto:adnanrev@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-lg mb-12"
          >
            Say Hello
          </motion.a>
          <div className="flex justify-center gap-6">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-zinc-400 hover:text-white"
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
