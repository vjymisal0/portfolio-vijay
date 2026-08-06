'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// Adapted from the 21st.dev "AuroraBackground" component: stripped down to a
// pure absolute-positioned layer (no own height/background) so it can sit
// behind existing section content instead of owning the viewport, and tuned
// to a low-opacity single layer that reads as ambient light rather than a
// loud gradient banner — this site is otherwise monochrome.
export default function AuroraBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0 scale-[2.2] transform-gpu opacity-30 [background-image:repeating-linear-gradient(100deg,var(--aurora-1)_10%,var(--aurora-2)_15%,var(--aurora-3)_20%,var(--aurora-4)_25%,var(--aurora-1)_30%)] [background-size:200%_200%]"
        style={
          {
            '--aurora-1': '#3b82f6',
            '--aurora-2': '#6366f1',
            '--aurora-3': '#8b5cf6',
            '--aurora-4': '#0ea5e9',
          } as React.CSSProperties
        }
      />
      {/* Fade to the page background at the edges so it reads as ambient
          light rather than a hard-edged panel. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,hsl(var(--background))_75%)]" />
    </div>
  )
}
