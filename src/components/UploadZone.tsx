"use client";

import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onImageSelected: (url: string) => void;
}

export function UploadZone({ onImageSelected }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    onImageSelected(url);
  }, [onImageSelected]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  return (
    <div
      className={cn(
        "w-full rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[200px]",
        isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent hover:bg-accent/5"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            handleFile(target.files[0]);
          }
        };
        input.click();
      }}
    >
      <Upload className="w-10 h-10 mb-4 text-muted-foreground" />
      <h3 className="text-lg font-semibold text-foreground mb-1">
        Upload your photo
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Drag & drop or click to browse
      </p>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
        <ImageIcon className="w-4 h-4" />
        <span>JPG, PNG supported</span>
      </div>
    </div>
  );
}
