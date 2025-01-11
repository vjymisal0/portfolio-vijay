'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Server, Database, Cloud, GitBranch, Cpu } from 'lucide-react'

const skillsData = [
  { category: "Languages", items: ['Java', 'Python', 'C++', 'C', 'JavaScript', 'TypeScript', 'PHP',], icon: Code },
  { category: "Frontend", items: ['HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS', 'React.js', 'Next.js'], icon: Cpu },
  { category: "Backend", items: ['Node.js', 'Express', 'GraphQL', 'Flask', 'REST APIs'], icon: Server },
  { category: "Databases", items: ['MongoDB', 'PostgreSQL', 'Firebase', 'MySQL'], icon: Database },
  { category: "Cloud & DevOps", items: ['AWS', 'Render', 'Vercel', 'Netlify', 'Docker', 'CI/CD'], icon: Cloud },
  { category: "Version Control", items: ['Git', 'GitHub'], icon: GitBranch },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export default function Skills() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillsData.map((skillCategory) => (
            <motion.div key={skillCategory.category} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                  <skillCategory.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl font-semibold">{skillCategory.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-sm bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

