// Per-technology badge colors, roughly matched to each tech's brand hue,
// dimmed to a consistent low-saturation tint so badges stay legible on
// both light and dark backgrounds.
const TECH_COLORS: Record<string, string> = {
  "React": "text-sky-400 bg-sky-500/10 border-sky-500/20",
  "Node.js": "text-lime-400 bg-lime-500/10 border-lime-500/20",
  "Express.js": "text-neutral-300 bg-neutral-500/10 border-neutral-500/20",
  "Firebase": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "sentiment.js": "text-pink-400 bg-pink-500/10 border-pink-500/20",
  "Java": "text-orange-400 bg-orange-500/10 border-orange-500/20",
  "Swing": "text-orange-300 bg-orange-500/10 border-orange-500/20",
  "MySQL": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "JDBC": "text-blue-300 bg-blue-500/10 border-blue-500/20",
  "MongoDB": "text-green-400 bg-green-500/10 border-green-500/20",
  "Google Cloud Vision": "text-red-400 bg-red-500/10 border-red-500/20",
  "Auth0": "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  "TypeScript": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "JavaScript": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  "Python": "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "Go": "text-teal-400 bg-teal-500/10 border-teal-500/20",
  "Vue": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Ruby": "text-rose-400 bg-rose-500/10 border-rose-500/20",
  "Django": "text-green-500 bg-green-500/10 border-green-500/20",
  "Rust": "text-orange-500 bg-orange-500/10 border-orange-500/20",
  "C": "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  "C++": "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  "Shell": "text-slate-400 bg-slate-500/10 border-slate-500/20",
  "Docs": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "NestJS": "text-rose-400 bg-rose-500/10 border-rose-500/20",
  "n8n": "text-orange-400 bg-orange-500/10 border-orange-500/20",
  "JWT": "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  "PostHog": "text-amber-400 bg-amber-500/10 border-amber-500/20",
}

// Deterministic fallback for any tech not in the map above, so new
// entries still get a stable, distinct color instead of one flat hue.
const FALLBACK_PALETTE = [
  "text-purple-400 bg-purple-500/10 border-purple-500/20",
  "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "text-lime-400 bg-lime-500/10 border-lime-500/20",
  "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "text-rose-400 bg-rose-500/10 border-rose-500/20",
  "text-teal-400 bg-teal-500/10 border-teal-500/20",
]

export function techColor(tech: string): string {
  if (TECH_COLORS[tech]) return TECH_COLORS[tech]
  let hash = 0
  for (let i = 0; i < tech.length; i++) hash = (hash * 31 + tech.charCodeAt(i)) >>> 0
  return FALLBACK_PALETTE[hash % FALLBACK_PALETTE.length]
}

// Hex equivalents of the badge hues above, for use as chart fills (SVG
// attributes can't consume Tailwind classes) — kept in visual lockstep with
// techColor() so a bar/segment always matches its badge elsewhere on the page.
const TECH_COLORS_HEX: Record<string, string> = {
  "React": "#38bdf8",
  "Node.js": "#a3e635",
  "Express.js": "#d4d4d4",
  "Firebase": "#fbbf24",
  "sentiment.js": "#f472b6",
  "Java": "#fb923c",
  "Swing": "#fdba74",
  "MySQL": "#60a5fa",
  "JDBC": "#93c5fd",
  "MongoDB": "#4ade80",
  "Google Cloud Vision": "#f87171",
  "Auth0": "#e879f9",
  "TypeScript": "#60a5fa",
  "JavaScript": "#facc15",
  "Python": "#22d3ee",
  "Go": "#2dd4bf",
  "Vue": "#34d399",
  "Ruby": "#fb7185",
  "Django": "#22c55e",
  "Rust": "#f97316",
  "C": "#818cf8",
  "C++": "#818cf8",
  "Shell": "#94a3b8",
  "Docs": "#a78bfa",
  "NestJS": "#fb7185",
  "n8n": "#fb923c",
  "JWT": "#e879f9",
  "PostHog": "#fbbf24",
}

const FALLBACK_PALETTE_HEX = ["#c084fc", "#22d3ee", "#a3e635", "#fbbf24", "#fb7185", "#2dd4bf"]

export function techColorHex(tech: string): string {
  if (TECH_COLORS_HEX[tech]) return TECH_COLORS_HEX[tech]
  let hash = 0
  for (let i = 0; i < tech.length; i++) hash = (hash * 31 + tech.charCodeAt(i)) >>> 0
  return FALLBACK_PALETTE_HEX[hash % FALLBACK_PALETTE_HEX.length]
}
