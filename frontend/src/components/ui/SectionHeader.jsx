import React from 'react';
import { useInView } from '../../hooks/useAnimations';

const SectionHeader = ({ number, title }) => {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      data-testid={`section-header-${number}`}
      className="flex items-center gap-6 mb-16"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <span className="font-mono text-sm text-accent tracking-widest opacity-70">
        {number}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
      <span className="font-mono text-sm text-slate-450 tracking-[0.3em] uppercase">
        {title}
      </span>
    </div>
  );
};

export default SectionHeader;
