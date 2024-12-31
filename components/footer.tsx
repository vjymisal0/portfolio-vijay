'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="bg-background border-t border-border py-8"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center space-y-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Vijay Misal. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-end space-x-1">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using Next.js, Tailwind CSS, ShadCN and Framer Motion.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

