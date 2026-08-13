"use client";

import { motion } from "framer-motion";

export function LayeredBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      
      {/* 1. Deep Sunset Gradient Mesh */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 81, 47, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(72, 202, 228, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(240, 152, 25, 0.2) 0%, transparent 60%)
          `
        }}
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* 2. Abstract Ocean Waveforms */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center opacity-60 mix-blend-screen"
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-[60vh]">
          <motion.path 
            d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" 
            fill="url(#sunsetGrad1)" 
            animate={{ 
              d: [
                "M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z",
                "M0,50 Q25,70 50,50 T100,50 L100,100 L0,100 Z",
                "M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,60 Q30,80 60,60 T100,60 L100,100 L0,100 Z" 
            fill="url(#sunsetGrad2)" 
            animate={{ 
              d: [
                "M0,60 Q30,80 60,60 T100,60 L100,100 L0,100 Z",
                "M0,60 Q30,40 60,60 T100,60 L100,100 L0,100 Z",
                "M0,60 Q30,80 60,60 T100,60 L100,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="sunsetGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(72, 202, 228, 0.25)" />
              <stop offset="100%" stopColor="rgba(0, 119, 182, 0.1)" />
            </linearGradient>
            <linearGradient id="sunsetGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 119, 182, 0.2)" />
              <stop offset="100%" stopColor="rgba(72, 202, 228, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Persistent Goa Coordinates Overlay (Softened) */}
      <div className="absolute top-1/4 right-8 font-sans text-xs text-white/50 tracking-[0.2em] text-right flex flex-col items-end">
        <span>15°29′N</span>
        <span>73°49′E</span>
        <span className="mt-2 w-8 h-[1px] bg-white/20" />
      </div>

      <div className="absolute bottom-1/4 left-8 font-sans text-xs text-white/50 tracking-[0.2em] flex flex-col items-start">
        <span className="w-8 h-[1px] bg-white/20 mb-2" />
        <span>GOA / INDIA</span>
        <span>28—31 OCT 2026</span>
      </div>

      {/* Soft CSS Noise Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
