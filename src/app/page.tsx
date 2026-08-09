"use client";

import { useState, useRef, useEffect } from "react";
import { Download, Share2 } from "lucide-react";
import { Hero } from "@/components/Hero";
import { FormatSelector } from "@/components/FormatSelector";
import { UploadZone } from "@/components/UploadZone";
import { BuilderForm } from "@/components/BuilderForm";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { RenderFormat, UserData } from "@/lib/canvasRenderer";
import { generateTitle } from "@/lib/titleGenerator";
import { sanitizeFilename } from "@/lib/utils";

export default function Home() {
  const [format, setFormat] = useState<RenderFormat>("PFP");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    role: "",
    tagline: "",
    title: "",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update generated title whenever name or role changes
  useEffect(() => {
    if (userData.name || userData.role) {
      const newTitle = generateTitle(userData.name, userData.role);
      if (userData.title !== newTitle) {
        setUserData((prev) => ({ ...prev, title: newTitle }));
      }
    }
  }, [userData.name, userData.role, userData.title]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    
    const namePart = userData.name ? `-${sanitizeFilename(userData.name)}` : "";
    link.download = `HHGOA2026-${format}${namePart}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShare = () => {
    handleDownload(); // Prompt download first
    
    // Then open X composer
    const text = `I just got framed for Hacker House Goa 2026.\n\nLess noise. More signal.\n\n#FrameInGoa @hackerhousegoa`;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    
    // Give a slight delay so download starts before navigating away or opening new tab
    setTimeout(() => {
      window.open(xUrl, "_blank");
    }, 500);
  };

  return (
    <main className="min-h-screen pb-20 px-4 md:px-8">
      <Hero />
      
      <div className="max-w-5xl mx-auto">
        <FormatSelector format={format} setFormat={setFormat} />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: Controls */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-muted/20 border border-border p-6 rounded-2xl">
              <UploadZone onImageSelected={setImgUrl} />
            </div>

            {format === "BUILDER" && (
              <div className="bg-muted/20 border border-border p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <BuilderForm userData={userData} setUserData={setUserData} />
              </div>
            )}

            {/* Action Buttons */}
            {imgUrl && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in duration-300">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-white text-black font-bold uppercase tracking-widest py-4 px-6 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PNG
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 bg-accent text-accent-foreground font-bold uppercase tracking-widest py-4 px-6 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,74,0,0.3)] hover:shadow-[0_0_25px_rgba(255,74,0,0.5)]"
                >
                  <Share2 className="w-5 h-5" />
                  Share on X
                </button>
              </div>
            )}
            {imgUrl && (
              <p className="text-xs text-muted-foreground text-center mt-2 animate-in fade-in">
                Note: Web browsers cannot directly attach images to X. The image will download, and then X will open for you to attach it.
              </p>
            )}
          </div>

          {/* RIGHT: Live Preview */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-8">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 text-center">
              Live Preview
            </h2>
            <PreviewCanvas 
              ref={canvasRef}
              format={format} 
              imgUrl={imgUrl} 
              userData={userData} 
            />
          </div>
          
        </div>
      </div>
    </main>
  );
}
