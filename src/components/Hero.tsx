"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative w-full min-h-[50vh] flex flex-col items-center justify-center pt-24 pb-12 font-sans overflow-hidden z-10">
      <motion.div
        key="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center w-full max-w-6xl px-4 md:px-8"
      >
        {/* Top Left Studio Marker */}
        <motion.div 
          className="md:absolute top-8 left-8 text-accent font-bold font-mono text-sm tracking-wider uppercase flex flex-col items-start mb-12 md:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">2:47PM</span>
          <span className="text-outline">STUDIO</span>
        </motion.div>
        
        {/* Massive Serif Title with Glowing Aura */}
        <div className="relative w-full flex justify-center items-center my-8">
          {/* Glowing Aura behind text */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-3/4 h-3/4 bg-accent/30 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.h1 
            className="font-display font-black leading-[0.8] tracking-tight text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[12rem] text-accent text-outline whitespace-nowrap z-10"
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            HACKER HOUSE
          </motion.h1>
          
          {/* Overlapping Pink Script Accent (Mock Devanagari/Hindi) */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink text-white font-black text-3xl md:text-5xl lg:text-6xl px-4 py-2 rotate-[-5deg] retro-border-pink z-20 shadow-[8px_8px_0_rgba(0,0,0,0.4)]"
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: -5, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 1 }}
          >
            गोआ
          </motion.div>
        </div>
        
        {/* Bottom Metadata row */}
        <motion.div 
          className="w-full flex flex-col md:flex-row justify-between items-center text-accent font-mono text-sm md:text-base font-bold tracking-widest uppercase mt-8 md:px-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span>GOA, INDIA &nbsp;&middot;&nbsp; 28 - 31 OCT 2026</span>
          <span className="hidden md:block text-pink font-black">GENERATE IDENTITY</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
