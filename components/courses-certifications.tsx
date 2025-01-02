'use client'

import { motion } from 'framer-motion'
import { BadgeIcon as Certificate, ExternalLink, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const certifications = [
  {
    title: 'JavaScript & JQuery',
    issuer: 'Amazon Web Services',
    date: 'August 2024',
    credentialUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-804abdd8-39ef-4196-bdf9-e98c866ac9a9.pdf',
  },
  {
    title: 'React.js',
    issuer: 'Udemy',
    date: 'August 2024',
    credentialUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-e0c9002a-c8b7-4995-8dde-196a1238cf17.pdf',
  },
  {
    title: 'Java',
    issuer: 'hackerrank',
    date: 'July 2022',
    credentialUrl: 'https://www.hackerrank.com/certificates/499a9a5ea6c8',
  },
  {
    title: 'Cloud Computing',
    issuer: 'LinkedIn Learning',
    date: 'September 2024',
    credentialUrl: 'https://www.linkedin.com/learning/certificates/64623e7e701df5658e86d54bbe4b63e4ce46a3ac446e3a175f4dcf3f7c1a8559?u=126888530',
  },
  {
    title: 'Generative AI',
    issuer: 'LinkedIn Learning',
    date: 'October 2024',
    credentialUrl: 'https://www.linkedin.com/learning/certificates/ed852ca2ee92281a6e504d59481b18ca43c229c1fa157d94e29479d6681ce3aa?u=126888530',
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

export default function CoursesAndCertifications() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Courses & Certifications
        </motion.h2>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <Certificate className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{cert.issuer}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 text-primary/60" />
                    {cert.date}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full group hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    onClick={() => window.open(cert.credentialUrl, '_blank')}
                  >
                    View Credential
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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

