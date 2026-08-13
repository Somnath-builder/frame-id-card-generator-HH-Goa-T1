"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [stage, setStage] = useState<"playing" | "done">("playing");
  const [isAudioOn, setIsAudioOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play the visual intro sequence on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("done");
      setTimeout(() => {
        onComplete();
      }, 800); // Wait for fade out
    }, 2500); // 2.5 seconds intro

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Handle Audio Toggle
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isAudioOn) {
      audioRef.current.pause();
      setIsAudioOn(false);
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => setIsAudioOn(true))
        .catch(e => console.log("Audio play failed", e));
    }
  };

  return (
    <>
      {/* Background Tune */}
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
      />

      {/* Floating Audio Toggle (Persists after intro) */}
      <button 
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-[200] p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors text-white"
        aria-label="Toggle Background Music"
      >
        {isAudioOn ? <Volume2 className="w-6 h-6 text-accent" /> : <VolumeX className="w-6 h-6 opacity-50" />}
      </button>

      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
          >
            <div className="flex flex-col items-center space-y-8">
              {/* Loader animation */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 300 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-1 bg-accent shadow-[0_0_15px_rgba(255,81,47,0.5)]"
              />
              
              {/* Glitchy Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground"
              >
                <motion.span
                  animate={{ opacity: [1, 0.5, 1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  Establishing connection to Goa...
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
