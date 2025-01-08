'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, MessageCircle, Syringe, ShoppingCart, Phone } from 'lucide-react'
// import { BiSportsCricket } from "react-icons/bi";
import { BiNotepad } from "react-icons/bi";
import { MdOutlineSportsCricket } from "react-icons/md";


const projects = [
  {
    title: 'SCORE-GO',
    description: 'SCORE-GO is a personalized cricket scoring website where users can signup, signin, create teams for local and global cricket tournaments and play matches, record scores and share it as a live scorecard with friends which can be viewed in real-time.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node JS', 'Express JS', 'MongoDB'],
    link: 'https://score-go.onrender.com/',
    github: 'https://github.com/vjymisal0/SCORE-GO'
  },
  {
    title: 'Chat App with Sentiment Analysis',
    description: 'A realtime chat application that allows users to signup, signin, search for users and chat with anyone with sentiment analysis that detects the sentiment of the messages sent by the users and displays it in the sentiments tab. The sentiment analysis is done using the sentiment.js library.',
    technologies: ['React', 'Node.js', 'Express.js', 'Firebase', 'sentiment.js'],
    link: 'https://chat-app-sentiment.netlify.app/',
    github: 'https://github.com/vjymisal0/Chat-App-with-Sentiment-Analysis'
  },
  {
    title: 'Vaccine Management System',
    description: 'A vaccine management system that allows users to signup, signin, search for vaccines, book appointments, view appointments, cancel appointments and view the vaccine availability in real-time.',
    technologies: ['Java', 'Swing', 'MySQL', 'JDBC'],
    link: '#',
    github: 'https://github.com/ITR-project-group/Vaccine_management_system'
  },
  {
    title: 'Smart Shopping Cart',
    description: 'An IOT based android application that allows users to connect with their cart in realtime, scan the products using the barcode scanner and with their smartphones too, add products to the cart, view the cart, remove products from the cart and place the order, all in realtime.',
    technologies: ['Java', 'Android', 'Firebase', 'Arduino', 'ESP32'],
    link: '#',
    github: 'https://github.com/vjymisal0/Smart-Shopping-Cart-IOT'
  },
  {
    title: 'Get Notes',
    description: 'A simple javascript based web application that allows users to create, edit, delete and view notes in real-time. The notes are stored in the local storage of the browser.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Local Storage'],
    link: 'https://vjymisal0.github.io/GetNotes/',
    github: 'https://github.com/vjymisal0/GetNotes'
  },
  {
    title: 'Phonebook Manager',
    description: 'A simple phonebook management system using python and PyQT5 that allows users to add, edit, delete, view and sort contacts in real-time. The contacts are stored in the MySQL Database.',
    technologies: ['Python', 'PyQT5', 'MySQL'],
    link: '#',
    github: 'https://github.com/vjymisal0/Phonebook-Management-PyQt5'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
}

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const techBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
}

const iconVariants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
}

const getColorForTechnology = (tech: string) => {
  const colors = [
    'bg-red-500/20 text-red-500 dark:bg-red-500/30 dark:text-red-300',
    'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-300',
    'bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-300',
    'bg-blue-500/20 text-blue-700 dark:bg-blue-500/30 dark:text-blue-300',
    'bg-indigo-500/20 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-300',
    'bg-purple-500/20 text-purple-700 dark:bg-purple-500/30 dark:text-purple-300',
    'bg-pink-500/20 text-pink-700 dark:bg-pink-500/30 dark:text-pink-300',
    'bg-orange-500/20 text-orange-700 dark:bg-orange-500/30 dark:text-orange-300',
    'bg-teal-500/20 text-teal-700 dark:bg-teal-500/30 dark:text-teal-300',
    'bg-cyan-500/20 text-cyan-700 dark:bg-cyan-500/30 dark:text-cyan-300',
  ]

  const index = tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

const getIconForProject = (title: string) => {
  switch (title) {
    case 'SCORE-GO':
      return MdOutlineSportsCricket 
    case 'Chat App with Sentiment Analysis':
      return MessageCircle
    case 'Vaccine Management System':
      return Syringe
    case 'Smart Shopping Cart':
      return ShoppingCart
    case 'Get Notes':
      return BiNotepad
    case 'Phonebook Manager':
      return Phone
    default:
      return ExternalLink
  }
}

export default function Projects() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Projects
        </motion.h2>
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => {
            const ProjectIcon = getIconForProject(project.title)
            return (
              <motion.div key={project.title} variants={cardVariants}>
                <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-primary/10">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <motion.div
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-primary"
                      >
                        <ProjectIcon className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-sm mb-4 line-clamp-3">
                      {project.description}
                    </CardDescription>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {project.technologies.map((tech) => (
                        <motion.div key={tech} variants={techBadgeVariants}>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getColorForTechnology(tech)} hover:bg-opacity-80 dark:hover:bg-opacity-50 transition-colors duration-300`}
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4 border-t border-primary/10">
                    {project.link === '#' ? (
                      <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
                        Not Available
                      </Button>
                    ) : (
                      <Button asChild variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button asChild variant="ghost" size="icon" className="group-hover:text-primary transition-colors duration-300">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

