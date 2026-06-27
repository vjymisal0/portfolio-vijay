'use client'

import { motion } from 'framer-motion'
import ElasticScroll from '@/components/elastic-scroll'
import { Trophy, Building2, Medal } from 'lucide-react'

const achievements = [
  {
    title: 'First Runner-Up — Primathon 2.0',
    organizer: 'Primus Techsystems',
    level: 'National Level Hackathon',
    description:
      'Secured First Runner-Up at Primathon 2.0, a national-level hackathon organized by Primus Techsystems, competing against teams from across India.',
    tags: ['First Runner-Up', 'National Level', 'Hackathon'],
  },
]

export default function Achievements() {
  return (
    <section className="h-full">
      <ElasticScroll
        className="h-full"
        innerClassName="min-h-full flex flex-col justify-center py-6 px-6 pb-24 lg:pb-6"
      >
      <div className="container mx-auto max-w-2xl">
        <motion.h2
          className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Achievements
        </motion.h2>

        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 100 } } }}
              className="group rounded-xl border border-border bg-card/40 hover:border-amber-500/40 hover:bg-card/70 hover:shadow-[0_0_32px_rgba(245,158,11,0.06)] transition-all duration-300 p-6"
            >
              {/* Top row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center group-hover:bg-amber-500/25 transition-colors">
                  <Trophy className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold leading-snug group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="flex-shrink-0 text-[11px] font-mono text-muted-foreground/40">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <Building2 className="w-3 h-3" />
                    {item.organizer}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Footer tags */}
              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <Medal className="w-3.5 h-3.5 text-amber-400/70" />
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </ElasticScroll>
    </section>
  )
}
