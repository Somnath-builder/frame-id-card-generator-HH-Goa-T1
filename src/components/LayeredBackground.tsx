"use client";

import { motion } from "framer-motion";

export function LayeredBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      
      {/* 1. Fluid Retro Gradient Mesh (Green to Yellow) */}
      <motion.div
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-80"
        style={{
          background: "radial-gradient(circle at center, var(--accent) 0%, transparent 50%), radial-gradient(circle at 20% 80%, var(--pink) 0%, transparent 40%)",
          filter: "blur(80px)",
        }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1, 1.2, 1],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      {/* 2. Fluid Yellow/White Ocean Waves */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center mix-blend-overlay opacity-60"
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-[50vh]">
          {/* Wave 1 */}
          <motion.path 
            d="M0,50 Q25,40 50,50 T100,50 L100,100 L0,100 Z" 
            fill="url(#retroGrad1)"
            animate={{ 
              d: [
                "M0,50 Q25,40 50,50 T100,50 L100,100 L0,100 Z",
                "M0,50 Q25,60 50,50 T100,50 L100,100 L0,100 Z",
                "M0,50 Q25,40 50,50 T100,50 L100,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Wave 2 */}
          <motion.path 
            d="M0,60 Q30,70 60,60 T100,60 L100,100 L0,100 Z" 
            fill="url(#retroGrad2)"
            animate={{ 
              d: [
                "M0,60 Q30,70 60,60 T100,60 L100,100 L0,100 Z",
                "M0,60 Q30,50 60,60 T100,60 L100,100 L0,100 Z",
                "M0,60 Q30,70 60,60 T100,60 L100,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Wave 3 (Foreground) */}
          <motion.path 
            d="M0,75 Q40,65 70,75 T100,75 L100,100 L0,100 Z" 
            fill="rgba(255, 229, 0, 0.4)"
            animate={{ 
              d: [
                "M0,75 Q40,65 70,75 T100,75 L100,100 L0,100 Z",
                "M0,75 Q40,85 70,75 T100,75 L100,100 L0,100 Z",
                "M0,75 Q40,65 70,75 T100,75 L100,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="retroGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 229, 0, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 0, 122, 0.2)" />
            </linearGradient>
            <linearGradient id="retroGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(14, 121, 60, 0.5)" />
              <stop offset="100%" stopColor="rgba(255, 229, 0, 0.5)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
