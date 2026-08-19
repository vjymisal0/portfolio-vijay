"use client"

import { motion } from "framer-motion"
import { ExternalLink, MessageCircle, Syringe, Activity } from "lucide-react"
import { FaGithub } from "react-icons/fa"

const projects = [
  {
    title: "Chat + Sentiment Analysis",
    description:
      "Real-time chat app with React, Node.js, and Firebase. Categorises messages as positive, negative, or neutral using sentiment.js with visual analytics.",
    technologies: ["React", "Node.js", "Express.js", "Firebase", "sentiment.js"],
    link: "https://chat-app-sentiment.netlify.app/",
    github: "https://github.com/vjymisal0/Chat-App-with-Sentiment-Analysis",
    icon: MessageCircle,
  },
  {
    title: "Vaccine Management",
    description:
      "Java Swing desktop app backed by MySQL via JDBC. Users can register, search vaccines, and book or cancel appointments with real-time availability.",
    technologies: ["Java", "Swing", "MySQL", "JDBC"],
    link: "#",
    github: "https://github.com/ITR-project-group/Vaccine_management_system",
    icon: Syringe,
  },
  {
    title: "Health Bites",
    description:
      "MERN wellness platform with Google Cloud Vision for AI food recognition, calorie tracking, meal planning, and Auth0 authentication.",
    technologies: ["React", "Node.js", "MongoDB", "Google Cloud Vision", "Auth0"],
    link: "https://health-bites-app.netlify.app/",
    github: "https://github.com/vjymisal0/Health-Bites-Stunner",
    icon: Activity,
  },
]

export default function Projects() {
  return (
    <div>
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-6">Selected Projects</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`group flex flex-col p-6 rounded-xl border border-border bg-card/10 transition-colors hover:border-foreground/30 ${i === 0 ? 'md:col-span-2' : ''}`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-foreground/5 border border-foreground/10 flex-shrink-0">
                  <project.icon className="w-4 h-4 text-foreground/70" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground">{project.title}</h3>
              </div>
              <div className="flex gap-2">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-foreground/5 text-muted-foreground transition-colors">
                  <FaGithub className="w-4 h-4" />
                </a>
                {project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-foreground/5 text-muted-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map(tech => (
                <span key={tech} className="text-[11px] font-mono text-muted-foreground px-2 py-1 rounded bg-foreground/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
