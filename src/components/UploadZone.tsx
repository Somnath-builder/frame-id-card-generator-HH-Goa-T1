"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
  onImageSelected: (url: string) => void;
}

export function UploadZone({ onImageSelected }: UploadZoneProps) {
  const [processingState, setProcessingState] = useState<
    "idle" | "input" | "analyzing" | "detected" | "ready"
  >("idle");
  
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setProcessingState("input");
        setTimeout(() => setProcessingState("analyzing"), 250);
        setTimeout(() => setProcessingState("detected"), 500);
        setTimeout(() => setProcessingState("ready"), 750);
        
        setTimeout(() => {
          const url = URL.createObjectURL(file);
          onImageSelected(url);
          setProcessingState("idle");
        }, 1000);
      }
    },
    [onImageSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".heic"],
    },
    multiple: false,
  });

  const getStatusText = () => {
    switch(processingState) {
      case "input": return "UPLOADING";
      case "analyzing": return "PROCESSING";
      case "detected": return "WARMING UP";
      case "ready": return "READY";
      default: return "";
    }
  };

  return (
    <div className="relative font-mono">
      <div
        {...getRootProps()}
        className={`relative transition-all duration-300 p-8 cursor-pointer overflow-hidden group glass-panel rounded-2xl ${
          isDragActive 
            ? "border-accent shadow-[0_0_30px_rgba(255,229,0,0.4)] bg-background/50" 
            : "border-white/30 hover:border-accent hover:shadow-[0_0_20px_rgba(255,229,0,0.3)] bg-background/20"
        }`}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {processingState !== "idle" ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4 py-8"
            >
              <div className="w-full max-w-[200px] h-3 bg-black/40 rounded-full relative overflow-hidden shadow-inner">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 goa-gradient w-1/2 rounded-full shadow-[0_0_10px_rgba(255,229,0,0.8)]"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.p 
                key={processingState}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent text-sm tracking-widest uppercase font-bold text-outline drop-shadow-[0_0_5px_rgba(255,229,0,0.5)]"
              >
                {getStatusText()}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4 py-6"
            >
              <div className={`p-4 transition-colors ${isDragActive ? 'text-accent' : 'text-white group-hover:text-accent'}`}>
                <Upload className="w-12 h-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,229,0,0.5)]" strokeWidth={2} />
              </div>
              
              <div className="text-center space-y-2">
                <p className={`text-lg font-bold tracking-wider uppercase transition-colors text-outline drop-shadow-md ${isDragActive ? 'text-accent' : 'text-white group-hover:text-accent'}`}>
                  {isDragActive ? "DROP PHOTO HERE" : "UPLOAD YOUR PHOTO"}
                </p>
                <p className="text-sm text-white/70 tracking-wider font-bold">
                  JPG / PNG / WEBP / HEIC
                </p>
              </div>
              
              <div className="mt-4 px-6 py-2 rounded-full border border-white/30 text-sm text-white font-bold group-hover:border-accent group-hover:text-accent transition-all uppercase tracking-widest">
                Browse Files
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
