"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MessageCircle, Syringe, ShoppingCart, Activity } from "lucide-react"
import { BiNotepad } from "react-icons/bi"
import { MdOutlineSportsCricket } from "react-icons/md"
import { FaGithub } from "react-icons/fa"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const projects = [
  {
    title: "SCORE-GO",
    description:
      "Full-stack cricket platform built with Node.js, Express.js, and MongoDB. Supports team management, live match scoring, and real-time shareable scorecards.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    link: "https://score-go.onrender.com/",
    github: "https://github.com/vjymisal0/SCORE-GO",
  },
  {
    title: "Chat + Sentiment Analysis",
    description:
      "Real-time chat app with React, Node.js, and Firebase. Categorises messages as positive, negative, or neutral using sentiment.js with visual analytics.",
    technologies: ["React", "Node.js", "Express.js", "Firebase", "sentiment.js"],
    link: "https://chat-app-sentiment.netlify.app/",
    github: "https://github.com/vjymisal0/Chat-App-with-Sentiment-Analysis",
  },
  {
    title: "Vaccine Management",
    description:
      "Java Swing desktop app backed by MySQL via JDBC. Users can register, search vaccines, and book or cancel appointments with real-time availability.",
    technologies: ["Java", "Swing", "MySQL", "JDBC"],
    link: "#",
    github: "https://github.com/ITR-project-group/Vaccine_management_system",
  },
  {
    title: "Smart Shopping Cart",
    description:
      "IoT Android app paired with an ESP32 barcode scanner. Products are scanned into a live cart, and Firebase syncs order data in real time.",
    technologies: ["Java", "Android", "Firebase", "Arduino", "ESP32"],
    link: "#",
    github: "https://github.com/vjymisal0/Smart-Shopping-Cart-IOT",
  },
  {
    title: "Get Notes",
    description:
      "Lightweight browser-based notes app. Create, edit, delete and view notes that persist across sessions via the Local Storage API.",
    technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
    link: "https://vjymisal0.github.io/GetNotes/",
    github: "https://github.com/vjymisal0/GetNotes",
  },
  {
    title: "Health Bites",
    description:
      "MERN wellness platform with Google Cloud Vision for AI food recognition, calorie tracking, meal planning, and Auth0 authentication.",
    technologies: ["React", "Node.js", "MongoDB", "Google Cloud Vision", "Auth0"],
    link: "https://health-bites-app.netlify.app/",
    github: "https://github.com/vjymisal0/Phonebook-Management-PyQt5",
  },
]

const techColor = (tech: string) => {
  const palette = [
    "bg-red-500/15 text-red-400",
    "bg-yellow-500/15 text-yellow-400",
    "bg-emerald-500/15 text-emerald-400",
    "bg-blue-500/15 text-blue-400",
    "bg-indigo-500/15 text-indigo-400",
    "bg-violet-500/15 text-violet-400",
    "bg-pink-500/15 text-pink-400",
    "bg-orange-500/15 text-orange-400",
    "bg-teal-500/15 text-teal-400",
    "bg-cyan-500/15 text-cyan-400",
  ]
  const i = tech.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length
  return palette[i]
}

const iconFor = (title: string) => {
  switch (title) {
    case "SCORE-GO":              return MdOutlineSportsCricket
    case "Chat + Sentiment Analysis": return MessageCircle
    case "Vaccine Management":    return Syringe
    case "Smart Shopping Cart":   return ShoppingCart
    case "Get Notes":             return BiNotepad
    case "Health Bites":          return Activity
    default:                      return ExternalLink
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14, stiffness: 100 } },
}

export default function Projects() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null)

  return (
    <section className="h-full flex flex-col py-5 overflow-y-auto bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-2xl font-bold mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, idx) => {
            const Icon = iconFor(project.title)
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                onClick={() => setSelected(project)}
                className="group relative rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)] transition-all duration-300 cursor-pointer p-4 flex flex-col gap-2.5"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                  <span className="flex-shrink-0 text-[11px] font-mono text-muted-foreground/40 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${techColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer links */}
                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  {project.link !== "#" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> Live
                    </a>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground/40">
                      <ExternalLink className="w-3 h-3" /> N/A
                    </span>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    <FaGithub className="w-3 h-3" /> Code
                  </a>
                  <span className="ml-auto text-[11px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Details →
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-foreground/80 leading-relaxed">
            {selected?.description}
          </DialogDescription>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {selected?.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className={`text-xs ${techColor(tech)}`}>
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            {selected?.link !== "#" && (
              <a
                href={selected?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" /> View Live
              </a>
            )}
            <a
              href={selected?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <FaGithub className="w-4 h-4" /> GitHub
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
