"use client";

import { RenderFormat } from "@/lib/canvasRenderer";
import { motion } from "framer-motion";

interface FormatSelectorProps {
  format: RenderFormat;
  setFormat: (val: RenderFormat) => void;
}

export function FormatSelector({ format, setFormat }: FormatSelectorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex p-1.5 glass-panel rounded-full">
        <button
          onClick={() => setFormat("PFP")}
          className={`relative px-8 py-3 text-sm font-sans font-medium transition-colors rounded-full ${
            format === "PFP" ? "text-white" : "text-white/50 hover:text-white"
          }`}
        >
          {format === "PFP" && (
            <motion.div
              layoutId="active-format"
              className="absolute inset-0 goa-gradient rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 uppercase tracking-wider">FRAME MODE</span>
        </button>
        
        <button
          onClick={() => setFormat("BUILDER")}
          className={`relative px-8 py-3 text-sm font-sans font-medium transition-colors rounded-full ${
            format === "BUILDER" ? "text-white" : "text-white/50 hover:text-white"
          }`}
        >
          {format === "BUILDER" && (
            <motion.div
              layoutId="active-format"
              className="absolute inset-0 goa-gradient rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 uppercase tracking-wider">BUILDER ID</span>
        </button>
      </div>
    </div>
  );
}
