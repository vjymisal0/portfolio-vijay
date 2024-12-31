'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
  visible: { opacity: 1, y: 0 }
}

const socialIconVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }
}

export default function Introduction() {
  return (
    <motion.section 
      className="py-20 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Avatar className="w-48 h-48 mx-auto mb-8 border-4 shadow-lg">
          <AvatarImage src="/vjy.jpg" alt="Vijay Misal" />
          <AvatarFallback>VM</AvatarFallback>
        </Avatar>
      </motion.div>
      <motion.h1
        className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Vijay Misal
      </motion.h1>
      <motion.h2
        className="text-3xl text-muted-foreground mb-6"
        variants={itemVariants}
      >
        Full Stack Developer
      </motion.h2>
      <motion.p
        className="max-w-2xl mx-auto mb-10 text-lg leading-relaxed"
        variants={itemVariants}
      >
        Passionate about creating elegant solutions to complex problems. With expertise in React, Node.js, and cloud technologies, I build scalable and efficient web applications that make a difference.
      </motion.p>
      <motion.div 
        className="flex justify-center space-x-6"
        variants={containerVariants}
      >
        <motion.a
          href="https://github.com/vjymisal0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors duration-200"
          variants={socialIconVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="h-8 w-8" />
          <span className="sr-only">GitHub</span>
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/vijaymisal/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors duration-200"
          variants={socialIconVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin className="h-8 w-8" />
          <span className="sr-only">LinkedIn</span>
        </motion.a>
        <motion.a
          href="mailto:vijay.22320079@viit.ac.in"
          className="text-foreground hover:text-primary transition-colors duration-200"
          variants={socialIconVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="h-8 w-8" />
          <span className="sr-only">Email</span>
        </motion.a>
      </motion.div>
    </motion.section>
  )
}

