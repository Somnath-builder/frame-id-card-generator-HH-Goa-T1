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
    <div className="relative font-sans glass-panel p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest">
          Identity Data
        </h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-xs text-white/60 uppercase tracking-widest mb-2 font-medium">
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
            className="w-full bg-black/30 border border-white/10 focus:border-accent text-white px-5 py-4 rounded-xl text-sm focus:outline-none transition-colors placeholder:text-white/30 font-bold shadow-inner"
          />
        </div>
        
        <div>
          <label htmlFor="role" className="block text-xs text-white/60 uppercase tracking-widest mb-2 font-medium">
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
            className="w-full bg-black/30 border border-white/10 focus:border-accent text-white px-5 py-4 rounded-xl text-sm focus:outline-none transition-colors placeholder:text-white/30 font-bold uppercase shadow-inner"
          />
        </div>
        
        <div>
          <label htmlFor="tagline" className="block text-xs text-white/60 uppercase tracking-widest mb-2 font-medium flex justify-between">
            <span>Tagline (Optional)</span>
            <span className="text-white/30">Max 40</span>
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            placeholder="Building the future."
            value={userData.tagline}
            onChange={handleChange}
            maxLength={40}
            className="w-full bg-black/30 border border-white/10 focus:border-accent text-white px-5 py-4 rounded-xl text-sm focus:outline-none transition-colors placeholder:text-white/30 font-light italic shadow-inner"
          />
        </div>
      </div>
    </div>
  );
}
