"use client";

import { useEffect, forwardRef } from "react";
import { renderPfpFrame, renderBuilderCard, RenderFormat, UserData } from "@/lib/canvasRenderer";

interface PreviewCanvasProps {
  format: RenderFormat;
  imgUrl: string | null;
  userData: UserData;
}

export const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(
  ({ format, imgUrl, userData }, ref) => {
    
    useEffect(() => {
      // Need to cast ref if it's a MutableRefObject
      const canvas = typeof ref === 'function' ? null : ref?.current;
      if (!canvas) return;

      const render = async () => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        if (format === "PFP") {
          await renderPfpFrame(canvas, imgUrl);
        } else {
          await renderBuilderCard(canvas, imgUrl, userData);
        }
      };

      render();
    }, [format, imgUrl, userData, ref]);

    return (
      <div className="w-full flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-[400px] shadow-2xl overflow-hidden rounded-xl bg-black border border-border"
          style={{ aspectRatio: format === "PFP" ? "1/1" : "1080/1350" }}
        >
          <canvas
            ref={ref}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }
);
PreviewCanvas.displayName = "PreviewCanvas";

