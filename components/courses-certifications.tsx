'use client'

import { motion } from 'framer-motion'
import { BadgeIcon as Certificate, ExternalLink } from 'lucide-react'
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
  visible: { opacity: 1, y: 0 }
}

export default function CoursesAndCertifications() {
  return (
    <section className="py-20">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
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
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Certificate className="h-8 w-8 text-primary" />
                <CardTitle>{cert.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground">{cert.date}</p>
              </CardContent>
              <CardFooter className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => window.open(cert.credentialUrl, '_blank')}
                >
                  View Credential
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

