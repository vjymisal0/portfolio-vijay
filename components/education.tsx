'use client'

import { motion } from 'framer-motion'
import { MapPin, CalendarDays } from 'lucide-react'

const educationData = [
  {
    degree: "Bachelor of Technology in Information Technology",
    short: "B.Tech — IT",
    institution: "Vishwakarma Institute of Information Technology",
    location: "Pune, Maharashtra",
    score: "8.44 CGPA",
    scoreColor: "bg-emerald-500/15 text-emerald-400",
    year: "2023 – 2026",
    index: "01",
  },
  {
    degree: "Diploma in Computer Technology",
    short: "Diploma — CS",
    institution: "Government Polytechnic, Solapur",
    location: "Solapur, Maharashtra",
    score: "91.43%",
    scoreColor: "bg-blue-500/15 text-blue-400",
    year: "2021 – 2023",
    index: "02",
  },
  {
    degree: "Secondary School Certificate",
    short: "SSC",
    institution: "Umabai Shravika Vidyalaya, Solapur",
    location: "Solapur, Maharashtra",
    score: "88.40%",
    scoreColor: "bg-violet-500/15 text-violet-400",
    year: "2020",
    index: "03",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', damping: 14, stiffness: 100 } },
}

export default function Education() {
  return (
    <section className="h-full overflow-y-auto">
      <div className="min-h-full flex flex-col justify-center py-6 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.h2
          className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Education
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border" />

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {educationData.map((edu) => (
              <motion.div key={edu.index} variants={itemVariants} className="flex gap-5">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 flex flex-col items-center pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center z-10">
                    <span className="text-[11px] font-mono font-semibold text-primary">{edu.index}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 rounded-xl border border-border bg-card/40 hover:border-primary/30 hover:bg-card/70 transition-all duration-300 p-4 group">
                  <div className="mb-2">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                        {edu.short}
                      </p>
                      <span className={`flex-shrink-0 text-xs px-2.5 py-0.5 rounded-full font-semibold ${edu.scoreColor}`}>
                        {edu.score}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="w-3 h-3" />
                      {edu.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  )
}
