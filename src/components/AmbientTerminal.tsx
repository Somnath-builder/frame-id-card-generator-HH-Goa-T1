"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AmbientTerminal() {
  const [logs, setLogs] = useState<string[]>(["> hhg.init()"]);
  
  useEffect(() => {
    const sequence = [
      { text: "> node: goa", delay: 1000 },
      { text: "> builders: online", delay: 2500 },
      { text: "> signal: strong", delay: 4000 },
      { text: "> frame_engine: ready", delay: 5000 },
      { text: "> status: build", delay: 6500 },
    ];

    const timeouts = sequence.map((item) => 
      setTimeout(() => {
        setLogs(prev => {
          const newLogs = [...prev, item.text];
          if (newLogs.length > 5) return newLogs.slice(1);
          return newLogs;
        });
      }, item.delay)
    );

    // Random glitch updates after initial sequence
    const interval = setInterval(() => {
      const msgs = [
        "> ping goa_node_1 ... 2ms",
        "> resolving identity_hash...",
        "> 0x7F2A... confirmed",
        "> listening for signal...",
        "> cpu_load: minimal"
      ];
      setLogs(prev => {
        const newLogs = [...prev, msgs[Math.floor(Math.random() * msgs.length)]];
        if (newLogs.length > 5) return newLogs.slice(1);
        return newLogs;
      });
    }, 8000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 w-64 hidden xl:flex flex-col z-0 opacity-50 mix-blend-screen pointer-events-none">
      <div className="border border-border/50 bg-black/20 backdrop-blur-md p-4 text-[10px] font-mono leading-relaxed text-accent/70 h-32 overflow-hidden flex flex-col justify-end">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="whitespace-nowrap"
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="w-2 h-3 bg-accent animate-pulse mt-1" />
      </div>
    </div>
  );
}
