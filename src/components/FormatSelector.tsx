"use client";

import { RenderFormat } from "@/lib/canvasRenderer";
import { motion } from "framer-motion";

interface FormatSelectorProps {
  format: RenderFormat;
  setFormat: (val: RenderFormat) => void;
}

export function FormatSelector({ format, setFormat }: FormatSelectorProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="flex glass-panel rounded-full overflow-hidden p-1 shadow-lg border border-white/20">
        <button
          onClick={() => setFormat("PFP")}
          className={`relative px-8 py-3 text-lg font-bold font-mono transition-colors rounded-full ${
            format === "PFP" ? "text-background" : "text-white hover:text-accent"
          }`}
        >
          {format === "PFP" && (
            <motion.div
              layoutId="active-format-glass"
              className="absolute inset-0 goa-gradient rounded-full -z-10 shadow-[0_0_15px_rgba(255,229,0,0.5)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10 uppercase tracking-wider">FRAME</span>
        </button>
        
        <button
          onClick={() => setFormat("BUILDER")}
          className={`relative px-8 py-3 text-lg font-bold font-mono transition-colors rounded-full ${
            format === "BUILDER" ? "text-background" : "text-white hover:text-accent"
          }`}
        >
          {format === "BUILDER" && (
            <motion.div
              layoutId="active-format-glass"
              className="absolute inset-0 goa-gradient rounded-full -z-10 shadow-[0_0_15px_rgba(255,229,0,0.5)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10 uppercase tracking-wider">ID CARD</span>
        </button>
      </div>
    </div>
  );
}
