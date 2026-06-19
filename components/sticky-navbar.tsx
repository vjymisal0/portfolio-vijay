'use client'

import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'courses', label: 'Courses' },
  { id: 'contact', label: 'Contact' },
]

interface Props {
  activeSection: string
  onNavigate: (id: string) => void
}

export default function StickyNavbar({ activeSection, onNavigate }: Props) {
  return (
    <motion.aside
      className="flex-shrink-0 w-40 h-screen border-r border-border bg-background/95 backdrop-blur-sm flex flex-col justify-center px-3 py-8"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mb-6 px-3">
        <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          Portfolio
        </span>
      </div>
      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
              activeSection === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            whileHover={{ x: activeSection === item.id ? 0 : 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {item.label}
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  )
}
