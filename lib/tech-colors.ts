// Per-technology identity colors — used as a small dot next to a neutral
// bordered tag (see components/tech-badge.tsx), never as a full tinted
// background. Deeper "-500/-600" steps rather than candy "-400" neons, so
// the dot reads as a considered accent rather than a template pastel pill.
const TECH_COLORS_HEX: Record<string, string> = {
  "React": "#0ea5e9",
  "Node.js": "#65a30d",
  "Express.js": "#a3a3a3",
  "Firebase": "#d97706",
  "sentiment.js": "#db2777",
  "Java": "#ea580c",
  "Swing": "#c2410c",
  "MySQL": "#2563eb",
  "JDBC": "#3b82f6",
  "MongoDB": "#16a34a",
  "Google Cloud Vision": "#dc2626",
  "Auth0": "#c026d3",
  "TypeScript": "#2563eb",
  "JavaScript": "#ca8a04",
  "Python": "#0891b2",
  "Go": "#0d9488",
  "Vue": "#059669",
  "Ruby": "#e11d48",
  "Django": "#15803d",
  "Rust": "#c2410c",
  "C": "#4f46e5",
  "C++": "#4f46e5",
  "Shell": "#64748b",
  "Docs": "#7c3aed",
  "NestJS": "#e11d48",
  "n8n": "#ea580c",
  "JWT": "#c026d3",
  "PostHog": "#d97706",
}

const FALLBACK_PALETTE_HEX = ["#9333ea", "#0891b2", "#65a30d", "#d97706", "#e11d48", "#0d9488"]

export function techColorHex(tech: string): string {
  if (TECH_COLORS_HEX[tech]) return TECH_COLORS_HEX[tech]
  let hash = 0
  for (let i = 0; i < tech.length; i++) hash = (hash * 31 + tech.charCodeAt(i)) >>> 0
  return FALLBACK_PALETTE_HEX[hash % FALLBACK_PALETTE_HEX.length]
}
