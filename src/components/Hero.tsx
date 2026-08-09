"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    // Only show intro once per session
    if (sessionStorage.getItem("hhg_intro_played")) {
      setShowIntro(false);
      return;
    }
    
    // Intro sequence choreography
    const seq = [
      setTimeout(() => setIntroStep(1), 300), // HHG_2026 SIGNAL
      setTimeout(() => setIntroStep(2), 600), // GOA NODE ONLINE
      setTimeout(() => setIntroStep(3), 900), // BUILDERS WELCOME
      setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("hhg_intro_played", "true");
      }, 1400)
    ];
    return () => seq.forEach(clearTimeout);
  }, []);

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background text-accent font-mono text-xs tracking-[0.2em] uppercase">
        <AnimatePresence mode="wait">
          {introStep === 0 && <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>INIT...</motion.div>}
          {introStep === 1 && <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>HHG_2026 SIGNAL</motion.div>}
          {introStep === 2 && <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>GOA NODE ONLINE</motion.div>}
          {introStep === 3 && <motion.div key="3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: "blur(10px)" }} className="text-white text-2xl font-bold font-sans">BUILDERS WELCOME</motion.div>}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto pt-20 pb-16 px-4 md:px-8 flex flex-col items-center md:items-start text-center md:text-left min-h-[50vh] justify-center">
      
      {/* Abstract Scanner Background / Side Graphic */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none md:flex hidden items-center justify-center w-[500px] h-[500px]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-accent/40"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border border-border"
        />
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t border-accent"
          style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
        />
        <div className="absolute text-[8px] text-accent/50 font-mono tracking-widest top-10">SYS_SCAN_ACTIVE</div>
        <div className="w-1 h-1 bg-accent rounded-full animate-ping" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full"
      >
        <div className="inline-flex items-center space-x-3 mb-8 border border-border bg-black/50 px-3 py-1.5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
          <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase font-mono">
            SYS.GENERATOR_ACTIVE <span className="text-accent ml-2">v2.0</span>
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[140px] font-display font-bold tracking-tighter leading-[0.85] uppercase text-white mix-blend-difference">
          FRAME YOUR<br/>
          <span className="text-accent block mt-2">BUILD.</span>
        </h1>
        
        <div className="mt-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          <p className="text-muted-foreground text-sm md:text-base max-w-sm font-mono leading-relaxed">
            Turn your photo into an official Hacker House Goa 2026 builder identity. 
            <br/><br/>
            Less noise. More signal. Built for those who ship.
          </p>
          
          <div className="flex flex-col space-y-2 text-xs font-mono text-muted-foreground uppercase tracking-[0.15em]">
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 bg-accent" /> 
              <span className="text-white">HH GOA 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 bg-border" /> 
              <span>GOA, INDIA</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 bg-border" /> 
              <span>28–31 OCT 2026</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

