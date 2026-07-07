'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import SectionTitle from '@/components/section-title'

// Drop screenshots into /public/projects/ using these file names and they
// will automatically replace the placeholders below.
const shots = [
  { title: 'SCORE-GO', src: '/projects/score-go.png' },
  { title: 'Chat + Sentiment', src: '/projects/chat-sentiment.png' },
  { title: 'Health Bites', src: '/projects/health-bites.png' },
  { title: 'Smart Shopping Cart', src: '/projects/smart-cart.png' },
  { title: 'Get Notes', src: '/projects/get-notes.png' },
  { title: 'Vaccine Management', src: '/projects/vaccine.png' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 100 } },
}

function Shot({ title, src }: { title: string; src: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-card/40 transition-all duration-300 hover:border-primary/40"
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${title} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-muted-foreground/50">
          <ImageIcon className="h-6 w-6" />
          <span className="text-[11px] font-medium">{title}</span>
          <span className="text-[10px] text-muted-foreground/30">screenshot coming soon</span>
        </div>
      )}

      {!failed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-3 py-2">
          <span className="text-[11px] font-medium text-foreground">{title}</span>
        </div>
      )}
    </motion.div>
  )
}

export default function ProjectGallery() {
  return (
    <div>
      <SectionTitle className="mb-5">Gallery</SectionTitle>

      <motion.div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {shots.map((shot) => (
          <Shot key={shot.title} {...shot} />
        ))}
      </motion.div>
    </div>
  )
}
