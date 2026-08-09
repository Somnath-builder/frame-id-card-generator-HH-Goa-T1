"use client";

import { UserData } from "@/lib/canvasRenderer";

interface BuilderFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export function BuilderForm({ userData, setUserData }: BuilderFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="relative font-mono">
      <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] text-accent tracking-[0.2em] z-10 uppercase">
        01 / INPUT DATA
      </div>
      
      <div className="border border-border bg-black/20 p-6 pt-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
            BUILDER NAME
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Satoshi Nakamoto"
            value={userData.name}
            onChange={handleChange}
            maxLength={20}
            className="w-full bg-black/50 border border-border focus:border-accent text-white px-4 py-3 text-sm focus:outline-none transition-colors rounded-none placeholder:text-muted-foreground/50 font-sans font-bold"
          />
        </div>
        
        <div>
          <label htmlFor="role" className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
            STACK / ROLE
          </label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="e.g. FULL STACK HACKER"
            value={userData.role}
            onChange={handleChange}
            maxLength={30}
            className="w-full bg-black/50 border border-border focus:border-accent text-white px-4 py-3 text-sm focus:outline-none transition-colors rounded-none placeholder:text-muted-foreground/50 font-sans uppercase"
          />
        </div>
        
        <div>
          <label htmlFor="tagline" className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-2 flex justify-between">
            <span>TAGLINE (OPTIONAL)</span>
            <span className="text-muted-foreground/50">MAX 40</span>
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            placeholder="Less Noise. More Signal."
            value={userData.tagline}
            onChange={handleChange}
            maxLength={40}
            className="w-full bg-black/50 border border-border focus:border-accent text-white px-4 py-3 text-sm focus:outline-none transition-colors rounded-none placeholder:text-muted-foreground/50 font-sans italic"
          />
        </div>
      </div>
    </div>
  );
}
