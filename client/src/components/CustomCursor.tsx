import React, { useState, useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Butter-smooth render loop using linear interpolation (lerp)
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      // ring trailing factor 0.18 for elegant, organic lag
      const dx = mouseRef.current.x - trailRef.current.x;
      const dy = mouseRef.current.y - trailRef.current.y;
      
      trailRef.current.x += dx * 0.18;
      trailRef.current.y += dy * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Hover detection for clickable items
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]');
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision inner dot */}
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-cream rounded-full pointer-events-none z-[10000] hidden md:block transition-transform duration-200 ease-out ${
          isHovered ? 'scale-150' : ''
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* Outer following ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-cream/35 rounded-full pointer-events-none z-[9999] hidden md:block transition-all duration-300 ease-out ${
          isHovered ? 'scale-150 border-cream bg-cream/5 shadow-[0_0_15px_rgba(222,219,200,0.1)]' : ''
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
