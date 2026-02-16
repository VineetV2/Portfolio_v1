import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (!options.repeat) {
          observer.unobserve(entry.target);
        }
      } else if (options.repeat) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold || 0.15,
      rootMargin: options.rootMargin || '0px',
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.repeat]);

  return [ref, isInView];
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? window.scrollY / totalHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
