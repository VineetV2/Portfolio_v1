import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import SectionHeader from '../ui/SectionHeader';
import { FileText } from 'lucide-react';

const Publications = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="publications" data-testid="publications-section" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader number="04" title="Publications" />

        <motion.div
          ref={ref}
          data-testid="publication-card"
          className="glass-card rounded-2xl p-8 md:p-12 border-l-2 border-l-accent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] mb-6">
            <FileText size={14} className="text-accent" />
            <span className="font-mono text-xs tracking-wider text-accent uppercase">IEEE Conference</span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-3 leading-tight max-w-3xl" data-testid="publication-title">
            Preventing Wildfires in Energy Transmission by Automatic Power Line Defects Detection Using Machine Learning and AI
          </h3>

          {/* Meta */}
          <p className="font-mono text-sm text-slate-500 mb-6 tracking-wide" data-testid="publication-meta">
            Presented at IEEE Conference, NJIT — December 10, 2025
          </p>

          {/* Description */}
          <p className="text-slate-400 leading-relaxed mb-8 max-w-3xl" data-testid="publication-desc">
            Developed a deep learning framework using Mask R-CNN and DeepLabV3+ to detect power line defects and
            vegetation encroachment from UAV imagery in real-time — enabling utilities to shift from reactive repairs
            to proactive wildfire prevention.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2" data-testid="publication-tags">
            {['Computer Vision', 'Mask R-CNN', 'DeepLabV3+', 'UAV Imagery', 'Semantic Segmentation'].map((tag) => (
              <span
                key={tag}
                className="skill-pill px-3 py-1.5 text-xs font-mono text-slate-400 border border-white/[0.06] rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
