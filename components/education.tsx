'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/section-title'

const educationData = [
  {
    degree: "B.Tech in Information Technology",
    institution: "Vishwakarma Institute of Information Technology",
    score: "8.44 CGPA",
    year: "2023 – 2026",
  },
  {
    degree: "Diploma in Computer Technology",
    institution: "Government Polytechnic, Solapur",
    score: "91.43%",
    year: "2021 – 2023",
  },
]

export default function Education() {
  return (
    <div>
      <SectionTitle className="mb-4">Education</SectionTitle>

      <motion.div 
        className="flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {educationData.map((edu, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground/90">{edu.degree}</span>
              <span className="text-muted-foreground/40 hidden sm:inline">•</span>
              <span className="text-muted-foreground">{edu.institution}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap mt-1 sm:mt-0">
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/50 font-medium">
                {edu.score}
              </span>
              <span className="text-xs font-mono">{edu.year}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
