"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, MessageCircle, Syringe, Activity, X } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import GitHubCharts from './github-charts'
import { techColor } from '@/lib/tech-colors'

type Project = {
  title: string
  description: string
  technologies: string[]
  link: string
  github: string
  icon: any
  caseStudy?: string
}

export const projects: Project[] = [
  {
    title: "Chat + Sentiment Analysis",
    description:
      "Real-time chat app with React, Node.js, and Firebase. Categorises messages as positive, negative, or neutral using sentiment.js with visual analytics.",
    technologies: ["React", "Node.js", "Express.js", "Firebase", "sentiment.js"],
    link: "https://chat-app-sentiment.netlify.app/",
    github: "https://github.com/vjymisal0/Chat-App-with-Sentiment-Analysis",
    icon: MessageCircle,
    caseStudy: "### The Challenge\nBuilding a real-time chat application often leads to UI stuttering and unoptimized database reads if not handled properly. I needed a way to instantly process incoming messages and determine their sentiment without blocking the main event loop.\n\n### The Solution\nI utilized Firebase's real-time listeners for instant synchronization across clients. For sentiment analysis, I integrated `sentiment.js` on the Node backend, exposing a WebSocket stream that categorizes and scores each message. The front-end renders these insights as an interactive dashboard showing the overall mood of the conversation.\n\n### The Result\nUsers experience zero perceived latency when chatting, and the real-time sentiment graph updates dynamically at 60fps, providing immediate feedback on the conversation's tone."
  },
  {
    title: "Vaccine Management",
    description:
      "Java Swing desktop app backed by MySQL via JDBC. Users can register, search vaccines, and book or cancel appointments with real-time availability.",
    technologies: ["Java", "Swing", "MySQL", "JDBC"],
    link: "#",
    github: "https://github.com/ITR-project-group/Vaccine_management_system",
    icon: Syringe,
    caseStudy: "### The Challenge\nManaging vaccine distribution requires strict concurrency control to prevent double-booking of limited appointment slots. The system also needed a robust, easy-to-deploy desktop interface for medical staff.\n\n### The Solution\nI built a standalone Java Swing application connected directly to a strictly normalized MySQL database using JDBC. To handle concurrency, I implemented row-level locking (SELECT ... FOR UPDATE) during the appointment booking transaction to guarantee data integrity. The UI uses custom Swing components to provide a responsive, grid-based dashboard.\n\n### The Result\nThe application completely eliminates race conditions during high-traffic booking events and provides staff with a seamless offline-capable interface for managing patient records."
  },
  {
    title: "Health Bites",
    description:
      "MERN wellness platform with Google Cloud Vision for AI food recognition, calorie tracking, meal planning, and Auth0 authentication.",
    technologies: ["React", "Node.js", "MongoDB", "Google Cloud Vision", "Auth0"],
    link: "https://health-bites-app.netlify.app/",
    github: "https://github.com/vjymisal0/Health-Bites-Stunner",
    icon: Activity,
    caseStudy: "### The Challenge\nUsers often struggle to manually log their daily food intake due to the tedious nature of searching for ingredients and estimating calories. I wanted to build an AI-first approach to dietary tracking.\n\n### The Solution\nHealth Bites uses the Google Cloud Vision API to analyze uploaded images of meals. The Node.js backend processes the labels returned by the AI, cross-references them against a nutritional MongoDB database, and automatically calculates the caloric and macronutrient breakdown. The entire application is secured with Auth0 and features a responsive React frontend.\n\n### The Result\nUsers can log a meal in under 3 seconds simply by snapping a photo. The app correctly identifies complex meals with 85%+ accuracy, significantly improving user retention compared to traditional manual-entry calorie trackers."
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div>
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-12">Selected Projects</h2>
      
      <div className="flex flex-col border-t border-border">
        {projects.map((project) => (
          <div
            key={project.title}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project) } }}
            role="button"
            tabIndex={0}
            className="group relative flex flex-col md:flex-row gap-6 py-8 pl-4 -ml-4 pr-4 border-b border-l-2 border-l-transparent border-border cursor-pointer transition-all duration-300 ease-out hover:border-l-foreground/40 hover:bg-foreground/[0.035] hover:shadow-sm rounded-r-lg focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
          >
            <div className="w-full md:w-1/3">
              <h3 className="font-serif text-xl font-medium text-foreground flex items-center gap-2">
                {project.title}
                <span className="text-muted-foreground opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
              </h3>
              <div className="flex gap-4 mt-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <FaGithub className="w-4 h-4" /> Code
                </a>
                {project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
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
                  <span key={tech} className={`text-xs font-mono px-2 py-0.5 rounded border ${techColor(tech)}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            />
            <div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              onKeyDown={(e) => { if (e.key === 'Escape') setSelectedProject(null) }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="w-full max-w-2xl bg-background border border-border shadow-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[85vh]"
              >
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h3 id="case-study-title" className="font-serif text-2xl font-medium text-foreground">{selectedProject.title}</h3>
                  <button onClick={() => setSelectedProject(null)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors" aria-label="Close case study">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto hide-scrollbar font-body text-foreground/90 leading-relaxed text-sm prose prose-sm dark:prose-invert max-w-none">
                  {selectedProject.caseStudy ? (
                    selectedProject.caseStudy.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return <h4 key={idx} className="font-serif text-lg font-medium text-foreground mt-6 mb-3 first:mt-0">{paragraph.replace('### ', '')}</h4>
                      }
                      return <p key={idx} className="mb-4 text-muted-foreground">{paragraph}</p>
                    })
                  ) : (
                    <p>Detailed case study coming soon.</p>
                  )}
                </div>
                
                <div className="p-6 border-t border-border bg-foreground/[0.02] flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                       <span key={tech} className={`text-xs font-mono px-2 py-1 rounded border ${techColor(tech)}`}>{tech}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                     <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                       <FaGithub className="w-4 h-4" /> View Code
                     </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      
      <div className="mt-8 border-t border-border pt-8">
        <GitHubCharts />
      </div>
    </div>
  )
}
