'use client'

import { motion } from 'framer-motion'
import { ExternalLink, CalendarDays } from 'lucide-react'

const certifications = [
  {
    title: 'JavaScript & jQuery',
    issuer: 'Udemy',
    issuerColor: 'bg-orange-500/15 text-orange-400',
    date: 'August 2024',
    credentialUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-804abdd8-39ef-4196-bdf9-e98c866ac9a9.pdf',
  },
  {
    title: 'React.js',
    issuer: 'Udemy',
    issuerColor: 'bg-orange-500/15 text-orange-400',
    date: 'August 2024',
    credentialUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-e0c9002a-c8b7-4995-8dde-196a1238cf17.pdf',
  },
  {
    title: 'Java',
    issuer: 'HackerRank',
    issuerColor: 'bg-emerald-500/15 text-emerald-400',
    date: 'July 2022',
    credentialUrl: 'https://www.hackerrank.com/certificates/499a9a5ea6c8',
  },
  {
    title: 'Cloud Computing',
    issuer: 'LinkedIn Learning',
    issuerColor: 'bg-blue-500/15 text-blue-400',
    date: 'September 2024',
    credentialUrl: 'https://www.linkedin.com/learning/certificates/64623e7e701df5658e86d54bbe4b63e4ce46a3ac446e3a175f4dcf3f7c1a8559?u=126888530',
  },
  {
    title: 'Generative AI',
    issuer: 'LinkedIn Learning',
    issuerColor: 'bg-blue-500/15 text-blue-400',
    date: 'October 2024',
    credentialUrl: 'https://www.linkedin.com/learning/certificates/ed852ca2ee92281a6e504d59481b18ca43c229c1fa157d94e29479d6681ce3aa?u=126888530',
  },
  {
    title: 'Backend Developer',
    issuer: 'Meta',
    issuerColor: 'bg-violet-500/15 text-violet-400',
    date: 'January 2025',
    credentialUrl: 'https://coursera.org/share/2b69aca6396dd733cb8010dba508c3b4',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 100 } },
}

export default function CoursesAndCertifications() {
  return (
    <section className="h-full flex flex-col py-5 overflow-y-auto bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-2xl font-bold mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Courses & Certifications
        </motion.h2>

        <motion.div
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)] transition-all duration-300 p-4 flex flex-col gap-2.5"
            >
              {/* Top row: index + issuer badge */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cert.issuerColor}`}>
                  {cert.issuer}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground/40">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors flex-grow">
                {cert.title}
              </h3>

              {/* Footer: date + link */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="w-3 h-3" />
                  {cert.date}
                </span>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Credential
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
