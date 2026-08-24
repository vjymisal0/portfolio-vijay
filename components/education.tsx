"use client"

import { MapPin } from 'lucide-react'

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
      <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-foreground mb-12">Education</h2>

      <div className="flex flex-col border-t border-border">
        {educationData.map((edu) => (
          <div key={edu.index} className="flex flex-col md:flex-row gap-6 py-8 border-b border-border">
            <div className="w-full md:w-1/3">
              <h3 className="font-serif text-xl font-medium text-foreground">{edu.institution}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                <MapPin className="w-3.5 h-3.5" /> {edu.location}
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2">
                <h4 className="text-base font-medium text-foreground">{edu.degree}</h4>
                <span className="text-sm font-mono text-muted-foreground">{edu.year}</span>
              </div>
              
              <div className="inline-block px-3 py-1 rounded-full font-mono text-xs bg-foreground/5 text-foreground/80">
                Score: {edu.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
