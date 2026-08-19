"use client"

import { MapPin, CalendarDays } from 'lucide-react'

const educationData = [
  {
    degree: "Bachelor of Technology in Information Technology",
    short: "B.Tech — IT",
    institution: "Vishwakarma Institute of Information Technology",
    location: "Pune, Maharashtra",
    score: "8.44 CGPA",
    year: "2023 – 2026",
    index: "01",
  },
  {
    degree: "Diploma in Computer Technology",
    short: "Diploma — CS",
    institution: "Government Polytechnic, Solapur",
    location: "Solapur, Maharashtra",
    score: "91.43%",
    year: "2021 – 2023",
    index: "02",
  },
]

export default function Education() {
  return (
    <div className="pt-8">
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-6">Education</h2>

      <div className="flex flex-col gap-3">
        {educationData.map((edu) => (
          <div key={edu.index} className="group rounded-xl border border-border bg-card/10 transition-colors hover:border-foreground/30 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="font-serif text-lg text-foreground">{edu.institution}</h3>
              <span className="text-xs font-mono text-muted-foreground">{edu.year}</span>
            </div>
            
            <p className="text-sm text-foreground/80 mb-4">{edu.degree}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {edu.location}
              </span>
              <span className="px-2 py-0.5 rounded font-mono bg-foreground/5 text-foreground/70 border border-transparent">
                {edu.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
