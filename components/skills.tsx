'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Code, Server, Database, Cloud, GitBranch, Cpu } from 'lucide-react'

const skillsData = [
  { category: "Languages", items: ['Java', 'Python', 'C++', 'C', 'JavaScript', 'TypeScript'], icon: Code },
  { category: "Frontend", items: ['HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS', 'React', 'Next.js'], icon: Cpu },
  { category: "Backend", items: ['Node.js', 'Express', 'GraphQL', 'Flask', 'REST APIs'], icon: Server },
  { category: "Databases", items: ['MongoDB', 'PostgreSQL', 'Firebase', 'MySQL'], icon: Database },
  { category: "Cloud & DevOps", items: ['AWS', 'Docker', 'CI/CD'], icon: Cloud },
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
  visible: { opacity: 1, y: 0 }
}

export default function Skills() {
  return (
    <section className="py-20">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>
      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillsData.map((skillCategory) => (
          <motion.div key={skillCategory.category} variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <skillCategory.icon className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">{skillCategory.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillCategory.items.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

