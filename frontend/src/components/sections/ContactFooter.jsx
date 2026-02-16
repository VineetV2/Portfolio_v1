import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import SectionHeader from '../ui/SectionHeader';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const ContactFooter = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <footer id="contact" data-testid="contact-section" className="relative py-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader number="08" title="Contact" />

        <div ref={ref}>
          {/* Big headline */}
          <motion.h2
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            data-testid="contact-headline"
          >
            Let's Build
            <br />
            <span className="bg-gradient-to-r from-accent via-accent/80 to-teal-300 bg-clip-text text-transparent">
              Something Great
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-400 mb-12 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            data-testid="contact-subtext"
          >
            Building something interesting? I'd love to hear about it.
          </motion.p>

          {/* Contact Links */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <a
              href="mailto:vineet.vora123@gmail.com"
              data-testid="contact-email"
              className="group flex items-center gap-3 px-6 py-4 glass-card rounded-xl hover:border-accent/20 transition-all duration-300 hoverable"
            >
              <Mail size={20} className="text-accent" />
              <span className="text-white font-mono text-sm">vineet.vora123@gmail.com</span>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
            </a>

            <a
              href="https://www.linkedin.com/in/vineetv2/"
              target="_blank"
              rel="noreferrer"
              data-testid="contact-linkedin"
              className="group flex items-center gap-3 px-6 py-4 glass-card rounded-xl hover:border-accent/20 transition-all duration-300 hoverable"
            >
              <Linkedin size={20} className="text-[#0A66C2]" />
              <span className="text-white font-mono text-sm">LinkedIn</span>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
            </a>

            <a
              href="https://github.com/VineetV2"
              target="_blank"
              rel="noreferrer"
              data-testid="contact-github"
              className="group flex items-center gap-3 px-6 py-4 glass-card rounded-xl hover:border-accent/20 transition-all duration-300 hoverable"
            >
              <Github size={20} className="text-white" />
              <span className="text-white font-mono text-sm">GitHub</span>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
            </a>
          </motion.div>

          {/* Footer bottom */}
          <motion.div
            className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-sm text-slate-500 font-mono" data-testid="footer-copyright">
              &copy; {new Date().getFullYear()} Vineet Vora. Crafted with precision.
            </p>
            <p className="text-xs text-slate-600 font-mono" data-testid="footer-tagline">
              Built with React + Framer Motion + Tailwind
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
