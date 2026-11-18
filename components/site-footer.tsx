import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaNpm } from 'react-icons/fa'
import VisitorCount from '@/components/visitor-count'

const links = [
  { href: 'mailto:misalvijay153@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://github.com/vjymisal0', label: 'GitHub', icon: FaGithub },
  { href: 'https://www.linkedin.com/in/vijaymisal/', label: 'LinkedIn', icon: FaLinkedin },
  { href: 'https://www.npmjs.com/~vjymisal0', label: 'npm', icon: FaNpm },
]

// Closes every page: contact links, the command-bar hint, and the visitor
// count, which used to float over the content.
export default function SiteFooter() {
  return (
    <footer className="container mx-auto mt-20 max-w-4xl px-6 pb-10 lg:px-12">
      <div className="flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Vijay Misal</p>
          <p className="mt-1 font-body text-xs text-muted-foreground">AI Engineer at Loopr AI · Pune, India</p>
        </div>
        <nav aria-label="Contact" className="flex flex-wrap gap-x-5 gap-y-1">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex min-h-11 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mt-4 flex min-h-5 flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[11px] text-muted-foreground/80">
        <p className="hidden sm:block">
          Press <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd> to jump anywhere
        </p>
        <VisitorCount />
      </div>
    </footer>
  )
}
