export function Hero() {
  return (
    <div className="text-center mb-10 pt-10">
      <div className="inline-flex items-center justify-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-6">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs font-bold text-accent tracking-widest uppercase">
          Live Generator
        </span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
        FRAME YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">BUILD.</span>
      </h1>
      
      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-6">
        Turn your photo into an official Hacker House Goa 2026 builder identity. 
        Built for builders. Made to be shared.
      </p>
      
      <div className="flex items-center justify-center space-x-6 text-sm font-mono text-muted-foreground uppercase tracking-widest">
        <span>HH GOA 2026</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>GOA, INDIA</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>28–31 OCT 2026</span>
      </div>
    </div>
  );
}
