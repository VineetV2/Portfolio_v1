import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import SectionHeader from '../ui/SectionHeader';
import { Building2 } from 'lucide-react';

const Experience = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="experience" data-testid="experience-section" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader number="05" title="Experience" />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/[0.06]">
            <motion.div
              className="w-full bg-accent"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>

          {/* Experience item */}
          <motion.div
            data-testid="experience-item-0"
            className="relative pl-20"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-[25px] top-2 w-[11px] h-[11px] rounded-full border-2 border-accent bg-void z-10">
              <div className="absolute inset-0 rounded-full bg-accent/30 animate-glow-pulse" />
            </div>

            {/* Date */}
            <div className="font-mono text-xs text-slate-500 tracking-wide mb-2">
              Oct — Dec 2023
            </div>

            {/* Card */}
            <div className="glass-card rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-warm/10 flex items-center justify-center">
                  <Building2 size={18} className="text-warm" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white" data-testid="experience-role">
                    Software Programmer
                  </h3>
                  <p className="text-sm text-slate-400 font-mono" data-testid="experience-company">
                    Xena Technologies · Ranchi, India
                  </p>
                </div>
              </div>

              <ul className="space-y-3" data-testid="experience-bullets">
                <li className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Shipped production features in Java/Python, owning code from design through deployment
                </li>
                <li className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Wrote unit tests that caught critical regressions, reducing QA bounce-backs
                </li>
                <li className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Refactored legacy modules with senior engineers — improved maintainability and reduced technical debt
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
