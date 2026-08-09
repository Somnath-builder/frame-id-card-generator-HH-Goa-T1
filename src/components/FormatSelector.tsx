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
      <div className="flex border border-border p-1 bg-black/40 backdrop-blur-md">
        <button
          onClick={() => setFormat("PFP")}
          className={`relative px-6 py-3 text-sm font-mono tracking-[0.1em] transition-colors ${
            format === "PFP" ? "text-black" : "text-muted-foreground hover:text-white"
          }`}
        >
          {format === "PFP" && (
            <motion.div
              layoutId="active-format"
              className="absolute inset-0 bg-accent -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="flex items-center gap-2 font-bold uppercase">
            <span className="text-lg leading-none">◉</span> FRAME MODE
          </span>
        </button>
        
        <button
          onClick={() => setFormat("BUILDER")}
          className={`relative px-6 py-3 text-sm font-mono tracking-[0.1em] transition-colors ${
            format === "BUILDER" ? "text-black" : "text-muted-foreground hover:text-white"
          }`}
        >
          {format === "BUILDER" && (
            <motion.div
              layoutId="active-format"
              className="absolute inset-0 bg-accent -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="flex items-center gap-2 font-bold uppercase">
            <span className="text-lg leading-none">◇</span> BUILDER MODE
          </span>
        </button>
      </div>
    </div>
  );
}
