import { techColorHex } from '@/lib/tech-colors'

// A restrained tag: neutral bordered pill + a small color dot carrying the
// tech's identity, rather than a full tinted-background pill. Keeps the
// site's mostly-monochrome language intact while still color-coding tech.
export function TechBadge({ tech, className = '' }: { tech: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/[0.03] px-2.5 py-1 text-[11px] font-mono text-foreground/75 leading-none ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: techColorHex(tech) }} />
      {tech}
    </span>
  )
}
