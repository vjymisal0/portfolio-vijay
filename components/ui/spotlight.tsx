import type { MouseEvent } from 'react'

// Mouse-follow glow for card hover states. Plain functions/props rather than
// a ref-based hook so this drops straight into elements rendered inside
// .map() without violating rules of hooks — position is written via
// CSS custom properties on the element itself (e.currentTarget), no state.
export function onSpotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}

export function SpotlightOverlay({ color = 'rgba(255,255,255,0.10)' }: { color?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
      style={{
        background: `radial-gradient(280px circle at var(--spot-x,50%) var(--spot-y,50%), ${color}, transparent 72%)`,
      }}
    />
  )
}
