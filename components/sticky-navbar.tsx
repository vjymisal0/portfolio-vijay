'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, Mail, Award, Code, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { icon: Home, label: 'Home' },
  { icon: Code, label: 'Skills' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Briefcase, label: 'Projects' },
  { icon: Award, label: 'Achievements' },
  { icon: Mail, label: 'Contact' },
]

export default function StickyNavbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      <motion.nav
        className="bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-lg"
        initial={{ width: '350px', height: '60px', opacity: 0, y: 20 }}
        animate={{ width: '390px', height: '60px', opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div 
          className="flex items-center justify-center h-full px-2 space-x-2"
        >
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative flex flex-col items-center justify-center w-12 h-12 p-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a 
                  href={`#${item.label.toLowerCase()}`}
                  className="flex flex-col items-center justify-center w-full h-full"
                  onClick={(e) => handleClick(e, item.label.toLowerCase())}
                >
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span 
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-1 text-xs whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.2 : 1,
                      y: hoveredIndex === index ? -2 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                </a>
              </Button>
            </div>
          ))}
        </motion.div>
      </motion.nav>
    </div>
  )
}

