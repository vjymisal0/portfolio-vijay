'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const educationData = [
  {
    degree: "Bachelor of Technology in Information Technology",
    institution: "Vishwakarma Institute of Information Technology",
    location: "Pune, Maharashtra",
    year: "2023 - 2026",
  },
  {
    degree: "Diploma in Computer Techhnology",
    institution: "Government Polytechnic, Solapur",
    location: "Solapur, Maharashtra",
    year: "2021 - 2023",
  },
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Education() {
  return (
    <section className="py-20">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Education
      </motion.h2>
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {educationData.map((edu, index) => (
          <motion.div key={index} variants={itemVariants} className="mb-8 last:mb-0">
            <Card className="relative">
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <CardContent className="pl-8 py-4">
                <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                <p className="text-lg mb-2">{edu.institution}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  {edu.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {edu.year}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
