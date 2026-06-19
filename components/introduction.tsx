'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 14, stiffness: 100 },
  },
}

const photoVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 14, stiffness: 80, delay: 0.3 },
  },
}

export default function Introduction() {
  return (
    <section className="h-full flex items-center bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">

          {/* Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4"
            >
              Full-Stack Developer
            </motion.span>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5 leading-[1.1]"
              variants={itemVariants}
            >
              Vijay{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Misal
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground mb-2"
              variants={itemVariants}
            >
              SDE Intern at{' '}
              <span className="font-semibold text-foreground tracking-tight">
                Loopr AI
              </span>
            </motion.p>

            <motion.p
              className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Passionate about creating elegant solutions to complex problems.
              I build scalable web applications with React, Node.js, and cloud technologies.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="gap-2 font-medium">
                <a href="https://github.com/vjymisal0" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <a href="https://www.linkedin.com/in/vijaymisal/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="gap-2 font-medium">
                <a href="mailto:misalvijay153@gmail.com">
                  <FaEnvelope className="h-4 w-4" />
                  Email
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="relative flex-shrink-0"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full border border-primary/20 scale-110 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-primary/10 scale-125" />
              <Avatar className="w-full h-full border-4 border-primary/25 shadow-2xl overflow-hidden rounded-full">
                <AvatarImage
                  src="/vjy.png"
                  alt="Vijay Misal"
                  className="w-full h-full object-cover brightness-90 contrast-[1.02] saturate-110"
                />
                <AvatarFallback className="text-4xl font-bold">VM</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
