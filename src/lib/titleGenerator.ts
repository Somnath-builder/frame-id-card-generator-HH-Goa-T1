export const ROLES = [
  "AI / ML",
  "FULL STACK",
  "WEB3",
  "FRONTEND",
  "BACKEND",
  "BLOCKCHAIN",
  "AI + WEB3",
  "DESIGN",
  "OTHER"
] as const;

export type Role = typeof ROLES[number];

const ROLE_TITLES: Record<Role, string[]> = {
  "AI / ML": [
    "THE MODEL WHISPERER",
    "THE MACHINE BUILDER",
    "THE INTELLIGENCE ARCHITECT"
  ],
  "FULL STACK": [
    "THE SYSTEM ARCHITECT",
    "THE PRODUCT SHIPPER",
    "THE FULL-STACK BUILDER"
  ],
  "WEB3": [
    "THE PROTOCOL ARCHITECT",
    "THE CHAIN BUILDER",
    "THE ON-CHAIN ENGINEER"
  ],
  "FRONTEND": [
    "THE INTERFACE ARCHITECT",
    "THE PIXEL SHIPPER",
    "THE EXPERIENCE CRAFTER"
  ],
  "BACKEND": [
    "THE INFRASTRUCTURE BUILDER",
    "THE SYSTEM ENGINEER",
    "THE DATA ARCHITECT"
  ],
  "BLOCKCHAIN": [
    "THE PROTOCOL BUILDER",
    "THE CHAIN ARCHITECT",
    "THE SMART CONTRACTOR"
  ],
  "AI + WEB3": [
    "THE PROTOCOL ALCHEMIST",
    "THE INTELLIGENCE ARCHITECT",
    "THE DECENTRALIZED MIND"
  ],
  "DESIGN": [
    "THE EXPERIENCE ARCHITECT",
    "THE VISUAL BUILDER",
    "THE AESTHETIC ENGINEER"
  ],
  "OTHER": [
    "THE BUILDER",
    "THE SHIPPER",
    "THE ARCHITECT",
    "THE CREATOR"
  ]
};

// Deterministic title generation based on user's name to keep it consistent
export function generateTitle(name: string, role: string): string {
  if (!name) name = "Builder";
  
  // Try to find the exact role, otherwise fallback to "OTHER"
  const mappedRole = ROLES.includes(role as Role) ? (role as Role) : "OTHER";
  
  const possibleTitles = ROLE_TITLES[mappedRole] || ROLE_TITLES["OTHER"];
  
  // Simple deterministic hash based on name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % possibleTitles.length;
  
  return possibleTitles[index];
}
