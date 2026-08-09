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
    <div className="relative font-mono glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="absolute -top-4 left-6 goa-gradient px-4 py-1 text-sm text-background rounded-full font-bold uppercase tracking-widest shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
        Identity Data
      </div>
      
      <div className="space-y-6 pt-4">
        <div>
          <label htmlFor="name" className="block text-sm text-accent uppercase font-bold tracking-widest mb-2 text-outline drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Builder Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Satoshi Nakamoto"
            value={userData.name}
            onChange={handleChange}
            maxLength={20}
            className="w-full bg-black/30 border border-white/20 focus:border-accent text-white rounded-xl px-5 py-4 text-base font-bold focus:outline-none transition-colors placeholder:text-white/30 focus:shadow-[0_0_15px_rgba(255,229,0,0.2)]"
          />
        </div>
        
        <div>
          <label htmlFor="role" className="block text-sm text-accent uppercase font-bold tracking-widest mb-2 text-outline drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Primary Role / Stack
          </label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="e.g. Full Stack Hacker"
            value={userData.role}
            onChange={handleChange}
            maxLength={30}
            className="w-full bg-black/30 border border-white/20 focus:border-accent text-white rounded-xl px-5 py-4 text-base font-bold focus:outline-none transition-colors placeholder:text-white/30 focus:shadow-[0_0_15px_rgba(255,229,0,0.2)] uppercase"
          />
        </div>
        
        <div>
          <label htmlFor="tagline" className="block text-sm text-accent uppercase font-bold tracking-widest mb-2 flex justify-between text-outline drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <span>Tagline (Optional)</span>
            <span className="text-white/40">Max 40</span>
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            placeholder="Building the future."
            value={userData.tagline}
            onChange={handleChange}
            maxLength={40}
            className="w-full bg-black/30 border border-white/20 focus:border-accent text-white rounded-xl px-5 py-4 text-base font-bold italic focus:outline-none transition-colors placeholder:text-white/30 focus:shadow-[0_0_15px_rgba(255,229,0,0.2)]"
          />
        </div>
      </div>
    </div>
  );
}
