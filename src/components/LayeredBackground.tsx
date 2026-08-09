"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LayeredBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
      
      {/* LAYER 1: Very fine technical grid (faint) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* LAYER 2: Larger coordinate grid (very faint) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00ff41 1px, transparent 1px),
            linear-gradient(to bottom, #00ff41 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* LAYER 3: Radial Glow (Animated imperceptibly) */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full blur-[100px] opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, var(--color-cyan) 0%, transparent 70%)',
          top: '20%',
          left: '30%',
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          bottom: '10%',
          right: '20%',
        }}
        animate={{
          x: [0, -40, 40, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* LAYER 4: Grain / Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* LAYER 5: Extremely subtle animated signal paths (vertical/horizontal lines that scan) */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] bg-accent/20"
        initial={{ left: '-10%' }}
        animate={{ left: '110%' }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-cyan/10"
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
      />
    </div>
  );
}
