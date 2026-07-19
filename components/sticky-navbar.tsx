'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, UserRound, FolderKanban, PenLine } from 'lucide-react'

const sectionItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'experience', label: 'Experience', icon: UserRound },
  { id: 'work', label: 'Projects', icon: FolderKanban },
]

const blogItem = { id: 'blog', label: 'Writings', icon: PenLine }

export default function StickyNavbar() {
  const navRef = useRef<HTMLElement>(null)
  const activeRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()
  const [hash, setHash] = useState('home')

  // Plain <a> tags (not next/link) for the in-page hash sections below: a
  // Link click to the same route with only the hash changed never fires a
  // native 'hashchange' event (Next intercepts it as a client transition),
  // so neither this highlight nor the page content would ever update.
  // Native anchors guarantee real browser fragment navigation instead.
  useEffect(() => {
    const applyHash = () => setHash(window.location.hash.replace('#', '') || 'home')
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const onBlog = pathname.startsWith('/blog')
  const activeId = onBlog ? 'blog' : pathname === '/' ? hash : ''

  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current
      const el = activeRef.current
      const scrollLeft = el.offsetLeft - nav.offsetWidth / 2 + el.offsetWidth / 2
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeId])

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <motion.aside
        className="hidden lg:flex flex-shrink-0 w-48 h-screen border-r border-border bg-background/95 backdrop-blur-sm flex-col justify-center px-3 py-8"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="mb-8 px-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Portfolio
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {sectionItems.map((item) => {
            const isActive = activeId === item.id
            const Icon = item.icon
            return (
              <motion.a
                key={item.id}
                href={`/#${item.id}`}
                whileHover={{ x: isActive ? 0 : 3 }}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                {item.label}
              </motion.a>
            )
          })}

          <div className="my-2 h-px bg-border" />

          <motion.div whileHover={{ x: activeId === 'blog' ? 0 : 3 }}>
            <Link
              href="/blog"
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeId === 'blog'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <blogItem.icon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
              {blogItem.label}
            </Link>
          </motion.div>
        </nav>
      </motion.aside>

      {/* ── Mobile liquid glass floating bottom nav ── */}
      <motion.div
        className="lg:hidden fixed bottom-5 inset-x-0 z-50 flex justify-center px-4"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      >
        <nav
          ref={navRef}
          className="nav-scroll flex items-center gap-0.5 overflow-x-auto max-w-full rounded-full px-2 py-1.5"
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow:
              '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          {[...sectionItems, blogItem].map((item) => {
            const isActive = activeId === item.id
            const Icon = item.icon
            const className =
              'relative flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap'
            const style = {
              color: isActive ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.42)',
              transition: 'color 0.2s ease',
            }
            const content = (
              <>
                {isActive && (
                  <motion.span
                    layoutId="liquid-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(140deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.13) 100%)',
                      border: '1px solid rgba(255,255,255,0.34)',
                      boxShadow:
                        '0 2px 12px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.40), inset 0 -1px 0 rgba(0,0,0,0.08)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2} />
                <span className="relative z-10">{item.label}</span>
              </>
            )
            return item.id === 'blog' ? (
              <Link
                key={item.id}
                ref={isActive ? activeRef : null}
                href="/blog"
                className={className}
                style={style}
              >
                {content}
              </Link>
            ) : (
              <a
                key={item.id}
                ref={isActive ? activeRef : null}
                href={`/#${item.id}`}
                className={className}
                style={style}
              >
                {content}
              </a>
            )
          })}
        </nav>
      </motion.div>
    </>
  )
}
