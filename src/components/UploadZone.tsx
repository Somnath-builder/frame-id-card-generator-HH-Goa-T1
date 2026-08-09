"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
  onImageSelected: (url: string) => void;
}

export function UploadZone({ onImageSelected }: UploadZoneProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setIsProcessing(true);
        // Simulate analysis sequence
        setTimeout(() => {
          const url = URL.createObjectURL(file);
          onImageSelected(url);
          setIsProcessing(false);
        }, 800);
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

  return (
    <div className="relative font-mono">
      <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] text-accent tracking-[0.2em] z-10">
        SIGNAL INPUT PORT
      </div>
      
      <div
        {...getRootProps()}
        className={`relative border transition-all duration-300 p-8 cursor-pointer overflow-hidden group ${
          isDragActive 
            ? "border-accent bg-accent/5" 
            : "border-border border-dashed hover:border-accent/50 bg-black/20"
        }`}
      >
        <input {...getInputProps()} />

        {/* ASCII Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/70 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/70 transition-transform group-hover:-translate-x-1 group-hover:translate-y-1" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/70 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4 py-8"
            >
              <div className="w-full max-w-[200px] h-1 bg-border relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 bg-accent w-1/3"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <p className="text-accent text-sm tracking-widest uppercase">ANALYZING SIGNAL...</p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4 py-6"
            >
              <div className={`p-4 transition-colors ${isDragActive ? 'text-accent' : 'text-muted-foreground group-hover:text-white'}`}>
                <Upload className="w-8 h-8" />
              </div>
              
              <div className="text-center space-y-2">
                <p className={`text-sm font-bold tracking-widest uppercase ${isDragActive ? 'text-accent' : 'text-white'}`}>
                  {isDragActive ? "SIGNAL DETECTED" : "DROP YOUR SIGNAL"}
                </p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  JPG / PNG / WEBP / HEIC
                </p>
              </div>
              
              <div className="mt-4 px-4 py-2 bg-black border border-border text-xs text-muted-foreground group-hover:border-accent/30 group-hover:text-white transition-colors">
                [ BROWSE FILES ]
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
