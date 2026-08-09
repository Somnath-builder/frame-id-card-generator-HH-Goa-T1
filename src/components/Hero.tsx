"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 font-sans overflow-hidden z-10">
      <motion.div
        key="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-6xl px-4 md:px-8"
      >
        {/* Left Typography */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center">
          <motion.div 
            className="inline-block px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs tracking-[0.2em] uppercase self-center md:self-start backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Hacker House Goa 2026
          </motion.div>
          
          <motion.h1 
            className="font-display font-black leading-[0.9] tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] text-white">
              FRAME YOUR
            </span>
            <span className="block text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] goa-gradient-text">
              BUILD.
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-white/60 font-sans text-lg md:text-xl max-w-md mx-auto md:mx-0 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Step into the sunset. Generate your official Builder Identity and PFP for Goa.
          </motion.p>
        </div>

        {/* Right Sun Graphic */}
        <motion.div 
          className="hidden md:flex relative w-64 h-64 lg:w-80 lg:h-80 items-center justify-center shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        >
          {/* Glowing Sun */}
          <motion.div
            className="absolute inset-0 rounded-full goa-gradient mix-blend-screen shadow-[0_0_80px_rgba(255,81,47,0.4)]"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Abstract Ocean Lines over the Sun */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-background/40" />
            <div className="absolute top-[60%] left-0 right-0 h-[1px] bg-background/50" />
            <div className="absolute top-[70%] left-0 right-0 h-[2px] bg-background/60" />
            <div className="absolute top-[80%] left-0 right-0 h-[3px] bg-background/80" />
            <div className="absolute top-[90%] left-0 right-0 h-[5px] bg-background" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
