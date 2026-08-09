"use client";

import { useState, useRef, useEffect } from "react";
import { Download, Share2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/Hero";
import { FormatSelector } from "@/components/FormatSelector";
import { UploadZone } from "@/components/UploadZone";
import { BuilderForm } from "@/components/BuilderForm";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { RenderFormat, UserData } from "@/lib/canvasRenderer";
import { generateTitle } from "@/lib/titleGenerator";
import { sanitizeFilename } from "@/lib/utils";
import { LayeredBackground } from "@/components/LayeredBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { AmbientTerminal } from "@/components/AmbientTerminal";

export default function Home() {
  const [format, setFormat] = useState<RenderFormat>("PFP");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    role: "",
    tagline: "",
    title: "",
  });
  const [isLocked, setIsLocked] = useState(false);
  const [isLockingAnimation, setIsLockingAnimation] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (userData.name || userData.role) {
      const newTitle = generateTitle(userData.name, userData.role);
      if (userData.title !== newTitle) {
        setUserData((prev) => ({ ...prev, title: newTitle }));
      }
    }
  }, [userData.name, userData.role, userData.title]);

  const handleLockSignal = () => {
    setIsLockingAnimation(true);
    setTimeout(() => {
      setIsLockingAnimation(false);
      setIsLocked(true);
    }, 1500); // Signature moment duration
  };

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
    handleDownload();
    const text = `I just locked my builder identity for Hacker House Goa 2026.\n\nLess noise. More signal.\n\n#FrameInGoa @hackerhousegoa`;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(xUrl, "_blank");
    }, 500);
  };

  return (
    <>
      <LayeredBackground />
      <CustomCursor />
      <AmbientTerminal />
      
      {/* Signature Moment Overlay */}
      <AnimatePresence>
        {isLockingAnimation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full mb-8"
            />
            <motion.div
              initial={{ letterSpacing: "10px", opacity: 0 }}
              animate={{ letterSpacing: "2px", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-mono text-accent uppercase tracking-widest font-bold"
            >
              SIGNAL LOCKED
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen pb-20 relative z-10">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FormatSelector format={format} setFormat={setFormat} />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            
            {/* LEFT: Controls */}
            <div className="space-y-8 order-2 lg:order-1">
              <UploadZone onImageSelected={(url) => {
                setImgUrl(url);
                setIsLocked(false);
              }} />

              {format === "BUILDER" && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <BuilderForm userData={userData} setUserData={setUserData} />
                </motion.div>
              )}

              {/* Action Buttons */}
              {imgUrl && !isLocked && !isLockingAnimation && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="pt-4"
                >
                  <button
                    onClick={handleLockSignal}
                    className="w-full bg-accent text-accent-foreground font-bold uppercase tracking-widest py-5 px-6 rounded-none border border-accent hover:bg-[#00cc33] transition-all flex items-center justify-center gap-3 group"
                  >
                    <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    LOCK IDENTITY
                  </button>
                </motion.div>
              )}

              {isLocked && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 space-y-4"
                >
                  <div className="text-center font-mono text-accent text-sm tracking-widest mb-4">
                    BUILDER IDENTITY LOCKED.<br/>READY TO SHIP.
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-white text-black font-bold uppercase tracking-widest py-4 px-6 rounded-none border border-white hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      DOWNLOAD
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 bg-transparent text-white font-bold uppercase tracking-widest py-4 px-6 rounded-none border border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      SHARE ON X
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* RIGHT: Live Preview */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-8">
              <PreviewCanvas 
                ref={canvasRef}
                format={format} 
                imgUrl={imgUrl} 
                userData={userData} 
              />
            </div>
            
          </div>
        </div>

        {/* HOW IT WORKS SECTION */}
        <section className="max-w-4xl mx-auto px-4 mt-32 border-t border-border/50 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-display font-bold text-muted-foreground/30">01</div>
              <h3 className="font-mono tracking-widest text-accent text-sm">UPLOAD</h3>
              <p className="text-muted-foreground text-sm font-mono">Your signal enters the system.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-display font-bold text-muted-foreground/30">02</div>
              <h3 className="font-mono tracking-widest text-accent text-sm">FRAME</h3>
              <p className="text-muted-foreground text-sm font-mono">HH Goa identity wraps around it.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-display font-bold text-muted-foreground/30">03</div>
              <h3 className="font-mono tracking-widest text-accent text-sm">SHIP</h3>
              <p className="text-muted-foreground text-sm font-mono">Download and share your builder identity.</p>
            </div>
          </div>
        </section>

        {/* GOA MOMENT SECTION */}
        <section className="w-full mt-32 relative h-[400px] flex items-center justify-center overflow-hidden border-t border-border">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Abstract Geometric Sun */}
            <motion.div 
              className="w-[600px] h-[600px] rounded-full border border-accent/20 absolute top-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 w-[1px] h-[40px] bg-accent/50" />
              <div className="absolute bottom-0 left-1/2 w-[1px] h-[40px] bg-accent/50" />
              <div className="absolute left-0 top-1/2 w-[40px] h-[1px] bg-accent/50" />
              <div className="absolute right-0 top-1/2 w-[40px] h-[1px] bg-accent/50" />
            </motion.div>
            
            {/* Horizon Line */}
            <div className="absolute top-[60%] left-0 right-0 h-[1px] bg-cyan/30 shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
          </div>
          
          <div className="relative z-10 text-center space-y-4 bg-background/80 backdrop-blur-sm p-8 border border-border">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-widest text-white uppercase">
              BUILD IN THE <span className="text-accent">SIGNAL.</span>
            </h2>
            <div className="font-mono text-sm tracking-[0.2em] text-cyan">GOA, INDIA</div>
            <div className="font-mono text-xs tracking-[0.1em] text-muted-foreground">28—31 OCT 2026</div>
          </div>
        </section>
      </main>
    </>
  );
}
