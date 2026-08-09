"use client";

import { ROLES, Role } from "@/lib/titleGenerator";
import { UserData } from "@/lib/canvasRenderer";

interface BuilderFormProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export function BuilderForm({ userData, setUserData }: BuilderFormProps) {
  return (
    <div className="space-y-4 w-full">
      <div>
        <label htmlFor="name" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="SOMNATH SAMADDAR"
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-mono uppercase"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
          Role / Stack
        </label>
        <select
          id="role"
          value={userData.role}
          onChange={(e) => setUserData((prev) => ({ ...prev, role: e.target.value }))}
          className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-mono uppercase appearance-none"
        >
          <option value="" disabled>Select your role...</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tagline" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
          Tagline (Optional)
        </label>
        <input
          id="tagline"
          type="text"
          placeholder="BUILDING THE FUTURE"
          value={userData.tagline}
          onChange={(e) => setUserData((prev) => ({ ...prev, tagline: e.target.value }))}
          className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-mono uppercase"
          maxLength={30}
        />
      </div>
    </div>
  );
}
