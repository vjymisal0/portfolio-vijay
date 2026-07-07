'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function SectionTitle({ children, className = '' }: Props) {
  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {children}
      </h2>
      <span className="mt-2 h-[3px] w-10 rounded-full bg-gradient-to-r from-primary via-primary/70 to-primary/20" />
    </motion.div>
  )
}
