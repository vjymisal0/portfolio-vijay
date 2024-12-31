'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Introduction from '@/components/introduction'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Achievements from '@/components/achievements'
import CoursesAndCertifications from '@/components/courses-certifications'
import Education from '@/components/education'
import Contact from '@/components/contact'
import StickyNavbar from '@/components/sticky-navbar'
import Footer from '@/components/footer'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function Home() {
  useEffect(() => {
    document.body.classList.add('dark')
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          id="home"
        >
          <Introduction />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          id="skills"
        >
          <Skills />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          id="education"
        >
          <Education />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          id="projects"
        >
          <Projects />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          id="achievements"
        >
          <Achievements />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          id="courses"
        >
          <CoursesAndCertifications />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          id="contact"
        >
          <Contact />
        </motion.div>
      </main>
      <Footer />
      <StickyNavbar />
    </div>
  )
}

