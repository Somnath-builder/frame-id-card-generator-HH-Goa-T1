"use client";

import { RenderFormat } from "@/lib/canvasRenderer";
import { cn } from "@/lib/utils";

interface FormatSelectorProps {
  format: RenderFormat;
  setFormat: (format: RenderFormat) => void;
}

export function FormatSelector({ format, setFormat }: FormatSelectorProps) {
  return (
    <div className="flex bg-muted/50 p-1 rounded-lg w-full max-w-md mx-auto">
      <button
        onClick={() => setFormat("PFP")}
        className={cn(
          "flex-1 py-3 px-4 rounded-md text-sm font-bold tracking-widest transition-all",
          format === "PFP"
            ? "bg-accent text-accent-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        PFP FRAME
      </button>
      <button
        onClick={() => setFormat("BUILDER")}
        className={cn(
          "flex-1 py-3 px-4 rounded-md text-sm font-bold tracking-widest transition-all",
          format === "BUILDER"
            ? "bg-accent text-accent-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        BUILDER CARD
      </button>
    </div>
  );
}
