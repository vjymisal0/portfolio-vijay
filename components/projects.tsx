/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink } from 'lucide-react'

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
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={cardVariants}>
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
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
                        <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
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
          ))}
        </motion.div>
      </div>
    </section>
  )
}

