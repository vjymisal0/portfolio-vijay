import type { ReactNode } from 'react'

// Standard CSS-only marquee: the track is rendered twice back-to-back and
// slides left by its own width + gap, so the loop point is invisible.
// Pauses on hover/focus via group-hover, and fades at the edges via a mask
// so items don't pop in/out abruptly.
export default function Marquee({
  children,
  reverse = false,
  durationSeconds = 32,
  className = '',
}: {
  children: ReactNode
  reverse?: boolean
  durationSeconds?: number
  className?: string
}) {
  return (
    <div
      className={`group relative flex w-full overflow-hidden [--gap:0.75rem] gap-[--gap] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center gap-[--gap] animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${durationSeconds}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
