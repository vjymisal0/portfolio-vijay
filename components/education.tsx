'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'
import SectionTitle from '@/components/section-title'
import { onSpotlightMove, SpotlightOverlay } from '@/components/ui/spotlight'

const educationData = [
  {
    degree: "B.Tech in Information Technology",
    institution: "Vishwakarma Institute of Information Technology",
    score: "8.44 CGPA",
    year: "2023 – 2026",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    degree: "Diploma in Computer Technology",
    institution: "Government Polytechnic, Solapur",
    score: "91.43%",
    year: "2021 – 2023",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 120 } },
}

export default function Education() {
  return (
    <div className="max-w-3xl">
      <SectionTitle className="mb-5">Education</SectionTitle>

      <motion.div 
        className="grid gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {educationData.map((edu, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            onMouseMove={onSpotlightMove}
            whileHover={{ scale: 1.01, x: 2 }}
            className="group group/spotlight relative rounded-xl border border-border bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden"
          >
            <SpotlightOverlay />
            
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {edu.degree}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {edu.institution}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-11 sm:ml-0">
              <span className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full border font-semibold ${edu.color}`}>
                {edu.score}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground/60">
                <Calendar className="w-3 h-3" />
                {edu.year}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
