import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import SectionHeader from '../ui/SectionHeader';

const skills = [
  'PyTorch', 'TensorFlow', 'Python', 'Java', 'Hadoop', 'AWS',
  'Docker', 'React.js', 'Node.js', 'CUDA', 'OpenCV', 'HuggingFace',
  'Scikit-learn', 'MongoDB', 'PostgreSQL', 'MapReduce', 'Git', 'CI/CD',
  'W&B', 'LoRA', 'HDFS', 'YARN', 'Spark', 'NumPy', 'Pandas', 'SQL',
];

const AboutSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="about" data-testid="about-section" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader number="01" title="About" />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Photo */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
                <img
                  src="https://www.vineetvora.dev/vineet.jpeg"
                  alt="Vineet Vora at NJIT campus"
                  data-testid="about-photo"
                  className="w-full aspect-[3/4] object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="lg:col-span-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 font-body" data-testid="about-bio-1">
              I'm a systems-minded ML builder who enjoys working where things are still unclear.
              I like taking ideas that exist only on paper and turning them into{' '}
              <span className="text-accent font-semibold">measurable, scalable systems</span> — from
              model training to post-training behavior in the real world.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mb-10 font-body" data-testid="about-bio-2">
              I care deeply about rigor, performance, and understanding{' '}
              <em className="text-slate-300">why</em> something works, not just that it does.
            </p>

            {/* Quote + Drives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Core Principle */}
              <motion.div
                className="glass-card rounded-xl p-6 border-l-2 border-l-accent"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                data-testid="about-core-principle"
              >
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-3 block">
                  Core Principle
                </span>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "A model isn't finished when it converges. It's finished when its behavior is{' '}
                  <span className="text-white font-medium underline decoration-accent/50 underline-offset-2">
                    understood, testable, and reliable
                  </span>{' '}
                  under real constraints."
                </p>
              </motion.div>

              {/* What Drives Me */}
              <motion.div
                className="glass-card rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                data-testid="about-drives"
              >
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-warm mb-3 block">
                  What Drives Me
                </span>
                <p className="text-sm text-slate-400 leading-relaxed">
                  End-to-end ownership · Post-training & inference behavior · Reinforcement learning ·
                  Scalable ML systems · Careful experimentation ·{' '}
                  <span className="text-warm font-medium">Signal over hype</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling skills ticker */}
        <motion.div
          className="mt-20 overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          data-testid="about-skills-ticker"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-void to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-void to-transparent z-10" />
          <div className="flex gap-4 animate-scroll">
            {[...skills, ...skills].map((skill, i) => (
              <span
                key={i}
                className="shrink-0 px-4 py-2 rounded-full border border-white/[0.06] text-sm font-mono text-slate-400 whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 30s linear infinite;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
