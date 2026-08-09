"use client";

import { forwardRef, useEffect } from "react";
import { renderPfpFrame, renderBuilderCard, RenderFormat, UserData } from "@/lib/canvasRenderer";
import { motion } from "framer-motion";

interface PreviewCanvasProps {
  format: RenderFormat;
  imgUrl: string | null;
  userData: UserData;
}

export const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(
  ({ format, imgUrl, userData }, ref) => {
    
    useEffect(() => {
      if (!ref || typeof ref === "function" || !ref.current) return;
      const canvas = ref.current;
      
      if (format === "PFP") {
        renderPfpFrame(canvas, imgUrl);
      } else {
        renderBuilderCard(canvas, imgUrl, userData);
      }
    }, [format, imgUrl, userData, ref]);

    return (
      <div className="relative font-mono w-full">
        <div className="flex items-center gap-2 mb-6 text-center justify-center">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest">
            Live Preview
          </h3>
        </div>
        
        <div className="relative glass-panel p-2 sm:p-4 group">
          
          {/* UI-Only Scanning Line */}
          {imgUrl && (
            <motion.div 
              className="absolute left-0 right-0 h-[2px] bg-accent/30 shadow-[0_0_10px_rgba(0,255,65,0.5)] z-20 pointer-events-none"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          )}

          <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center overflow-hidden bg-black border border-border/50">
            {imgUrl ? (
              <canvas
                ref={ref}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-border/50 w-[80%] h-[80%]">
                <div className="w-8 h-8 border border-accent/50 animate-spin mb-4" style={{ animationDuration: '3s' }} />
                <p className="text-accent text-sm tracking-widest font-bold mb-2">AWAITING SIGNAL</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  UPLOAD PHOTO TO INITIALIZE<br/>FRAME ENGINE
                </p>
                <canvas ref={ref} className="hidden" />
              </div>
            )}
          </div>
          
          {/* UI-Only technical metadata footer */}
          <div className="flex justify-between items-center mt-2 text-[8px] text-muted-foreground uppercase tracking-widest">
            <span>RES: 1080x{format === "PFP" ? "1080" : "1350"}</span>
            <span>STATUS: {imgUrl ? "LOCKED" : "IDLE"}</span>
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${imgUrl ? 'bg-accent' : 'bg-red-500'}`} />
              NODE_ACTIVE
            </span>
          </div>
        </div>
      </div>
    );
  }
);
PreviewCanvas.displayName = "PreviewCanvas";
