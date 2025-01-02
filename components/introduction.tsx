'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
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

const socialIconVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }
}

export default function Introduction() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Avatar className="w-48 h-48 mx-auto mb-8 border-4 border-primary/20 shadow-lg">
              <AvatarImage src="/vjy.jpg" alt="Vijay Misal" />
              <AvatarFallback>VM</AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Vijay Misal
          </motion.h1>
          <motion.h2
            className="text-2xl sm:text-3xl text-muted-foreground mb-6"
            variants={itemVariants}
          >
            Full Stack Developer
          </motion.h2>
          <motion.p
            className="mb-10 text-base sm:text-lg leading-relaxed"
            variants={itemVariants}
          >
            Passionate about creating elegant solutions to complex problems. With expertise in React, Node.js, and cloud technologies, I build scalable and efficient web applications that make a difference.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            variants={containerVariants}
          >
            <motion.div variants={socialIconVariants}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                asChild
              >
                <a
                  href="https://github.com/vjymisal0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  GitHub
                </a>
              </Button>
            </motion.div>
            <motion.div variants={socialIconVariants}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/vijaymisal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  LinkedIn
                </a>
              </Button>
            </motion.div>
            <motion.div variants={socialIconVariants}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                asChild
              >
                <a
                  href="mailto:vijay.22320079@viit.ac.in"
                  className="flex items-center justify-center"
                >
                  <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Email
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

