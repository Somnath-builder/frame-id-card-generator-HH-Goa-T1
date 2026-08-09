"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Also track exact position for the coordinate display (no spring)
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on devices with a fine pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      setCoords({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) setIsVisible(true);

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                         target.tagName.toLowerCase() === 'button' || 
                         target.tagName.toLowerCase() === 'a' || 
                         target.tagName.toLowerCase() === 'input' ||
                         target.tagName.toLowerCase() === 'select';
      
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Crosshair */}
        <div className="relative w-full h-full">
          <div className={`absolute top-1/2 left-0 w-full h-[1px] bg-accent transition-transform duration-200 ${isPointer ? 'scale-150' : ''}`} />
          <div className={`absolute top-0 left-1/2 w-[1px] h-full bg-accent transition-transform duration-200 ${isPointer ? 'scale-150' : ''}`} />
        </div>
        
        {/* Coordinates */}
        <div className="absolute top-4 left-4 text-[10px] font-mono text-accent whitespace-nowrap opacity-70">
          X:{coords.x.toString().padStart(4, '0')} Y:{coords.y.toString().padStart(4, '0')}
        </div>
      </motion.div>
    </>
  );
}
