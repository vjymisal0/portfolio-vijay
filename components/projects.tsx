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
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-12">Selected Projects</h2>
      
      <div className="flex flex-col border-t border-border">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col md:flex-row gap-6 py-8 border-b border-border transition-colors hover:bg-foreground/5"
          >
            <div className="w-full md:w-1/3">
              <h3 className="font-serif text-xl font-medium text-foreground">{project.title}</h3>
              <div className="flex gap-4 mt-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <FaGithub className="w-4 h-4" /> Code
                </a>
                {project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <p className="text-base font-body text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs font-mono text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
