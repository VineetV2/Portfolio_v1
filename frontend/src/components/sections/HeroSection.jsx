import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Github } from 'lucide-react';

const roles = ['ML Engineer', 'Full-Stack Developer', 'AI Researcher'];

const HeroSection = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, roleIdx]);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-sm tracking-[0.3em] uppercase text-accent mb-8"
          data-testid="hero-subtitle"
        >
          Software Engineer & AI Researcher
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-6"
          data-testid="hero-name"
        >
          <span className="text-white">Vineet</span>
          <br />
          <span className="bg-gradient-to-r from-accent via-accent/80 to-teal-300 bg-clip-text text-transparent">
            Vora
          </span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="h-8 mb-10"
          data-testid="hero-role"
        >
          <span className="font-mono text-lg text-slate-400 tracking-wide">
            {displayText}
            <span className="inline-block w-[2px] h-5 bg-accent ml-1 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-body"
          data-testid="hero-bio"
        >
          I design full-stack systems where machine learning actually ships.
          <br className="hidden sm:block" />
          Not just experiments.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          data-testid="hero-ctas"
        >
          <a
            href="#projects"
            data-testid="hero-view-projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group px-8 py-3.5 bg-accent text-void font-heading font-semibold text-sm tracking-wide rounded-full hover:shadow-[0_0_30px_rgba(14,246,204,0.4)] transition-all duration-300 flex items-center gap-2 hoverable"
          >
            View Projects
            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            data-testid="hero-lets-talk"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 border border-white/10 text-white font-heading font-semibold text-sm tracking-wide rounded-full hover:border-accent/40 hover:text-accent transition-all duration-300 hoverable"
          >
            Let's Talk
          </a>
          <a
            href="https://github.com/VineetV2"
            target="_blank"
            rel="noreferrer"
            data-testid="hero-github"
            className="px-8 py-3.5 text-slate-400 font-heading font-semibold text-sm tracking-wide hover:text-white transition-colors flex items-center gap-2 hoverable"
          >
            <Github size={18} />
            GitHub
          </a>
        </motion.div>

        {/* Open to opportunities badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/[0.05]"
          data-testid="hero-availability"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
          <span className="text-xs font-mono text-accent tracking-wider">Open to opportunities</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        data-testid="hero-scroll-indicator"
      >
        <ArrowDown size={20} className="text-slate-500 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
