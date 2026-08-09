export const ROLES = [
  "SOFTWARE ENGINEER",
  "FRONTEND DEVELOPER",
  "BACKEND DEVELOPER",
  "FULL STACK DEVELOPER",
  "WEB3 DEVELOPER",
  "UI/UX DESIGNER",
  "PRODUCT MANAGER",
  "FOUNDER",
  "RESEARCHER",
  "OTHER"
] as const;

export type Role = typeof ROLES[number];

const TITLES = [
  "BUILDER CLASS: 01 — THE SHIPPER",
  "BUILDER CLASS: 02 — THE ARCHITECT",
  "BUILDER CLASS: 03 — THE PROTOCOL BUILDER",
  "BUILDER CLASS: 04 — THE MACHINE WHISPERER",
  "BUILDER CLASS: 05 — THE INTERFACE HACKER",
  "BUILDER CLASS: 06 — THE SYSTEM BREAKER",
  "BUILDER CLASS: 07 — THE PRODUCT ALCHEMIST",
  "BUILDER CLASS: 08 — THE SIGNAL ENGINEER",
  "BUILDER CLASS: 09 — THE CHAIN BUILDER"
];

// Deterministic title generation based on user's name
export function generateTitle(name: string, role: string): string {
  const input = `${name.trim().toLowerCase()}-${role.trim().toLowerCase()}`;
  if (!input || input === "-") return "BUILDER CLASS: 00 — THE UNKNOWN";
  
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  
  const index = Math.abs(hash) % TITLES.length;
  return TITLES[index];
}
