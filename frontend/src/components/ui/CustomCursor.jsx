import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const over = () => setHovering(true);
    const out = () => setHovering(false);

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, .hoverable').forEach((el) => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .hoverable').forEach((el) => {
        el.removeEventListener('mouseenter', over);
        el.removeEventListener('mouseleave', out);
        el.addEventListener('mouseenter', over);
        el.addEventListener('mouseleave', out);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        data-testid="custom-cursor"
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(14, 246, 204, 0.6)',
          marginLeft: hovering ? -8 : 0,
          marginTop: hovering ? -8 : 0,
          opacity: 0.8,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10001] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#0EF6CC',
        }}
      />
    </>
  );
};

export default CustomCursor;
