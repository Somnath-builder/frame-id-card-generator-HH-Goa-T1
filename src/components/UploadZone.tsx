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
      case "analyzing": return "ENHANCING";
      case "detected": return "WARMING UP";
      case "ready": return "READY";
      default: return "";
    }
  };

  return (
    <div className="relative font-sans">
      <div
        {...getRootProps()}
        className={`glass-panel relative transition-all duration-300 p-8 cursor-pointer overflow-hidden group border-2 border-dashed ${
          isDragActive 
            ? "border-accent bg-accent/10" 
            : "border-white/20 hover:border-accent/50 hover:bg-white/5"
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
              <div className="w-full max-w-[200px] h-2 bg-black/40 rounded-full relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 goa-gradient w-1/3 rounded-full"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.p 
                key={processingState}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent text-sm tracking-wider uppercase font-bold"
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
              <div className={`p-4 rounded-full transition-colors ${isDragActive ? 'bg-accent/20 text-accent' : 'bg-black/30 text-white/70 group-hover:bg-accent/10 group-hover:text-accent'}`}>
                <Upload className="w-8 h-8" />
              </div>
              
              <div className="text-center space-y-2">
                <p className={`text-sm font-bold tracking-wider uppercase ${isDragActive ? 'text-accent' : 'text-white'}`}>
                  {isDragActive ? "DROP PHOTO HERE" : "UPLOAD YOUR PHOTO"}
                </p>
                <p className="text-xs text-white/50 tracking-wider uppercase font-light">
                  JPG / PNG / WEBP / HEIC
                </p>
              </div>
              
              <div className="mt-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 group-hover:border-accent/30 group-hover:text-white transition-colors uppercase tracking-widest">
                Browse Files
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
