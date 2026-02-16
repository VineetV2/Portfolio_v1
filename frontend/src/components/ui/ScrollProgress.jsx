import React from 'react';
import { useScrollProgress } from '../../hooks/useAnimations';

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[51] h-[2px] bg-transparent"
      data-testid="scroll-progress"
    >
      <div
        className="h-full bg-accent transition-[width] duration-100 ease-out"
        style={{
          width: `${progress * 100}%`,
          boxShadow: progress > 0 ? '0 0 10px rgba(14, 246, 204, 0.5)' : 'none',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
