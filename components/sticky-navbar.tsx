'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, UserRound, FolderKanban } from 'lucide-react'
import { Dock, DockIcon } from '@/components/ui/dock'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const sectionItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'experience', label: 'Experience', icon: UserRound },
  { id: 'work', label: 'Background', icon: FolderKanban },
]

export default function StickyNavbar() {
  const pathname = usePathname()
  const [hash, setHash] = useState('home')

  const onBlog = pathname.startsWith('/blog')

  // Re-read the hash on every route change (not just mount) so the highlight
  // updates when returning from /blog to a '/#section' — a client navigation
  // that never fires 'hashchange'.
  useEffect(() => {
    const applyHash = () => setHash(window.location.hash.replace('#', '') || 'home')
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [pathname])

  const activeId = onBlog ? 'blog' : pathname === '/' ? hash : ''

  // Leaving /blog via client-side nav, the home page can't rely on the hash
  // being applied before it mounts, so hand off the target section explicitly.
  const gotoSection = (id: string) => {
    if (onBlog) sessionStorage.setItem('goto-section', id)
  }

  // Section links behave differently depending on where we are:
  // - On '/', a native <a href="/#id"> changes only the hash (no reload) and
  //   fires 'hashchange', which swaps the section instantly.
  // - On '/blog', a native anchor to '/#id' would do a full-page reload (the
  //   lag). Use next/link instead for a client-side route change; the home page
  //   reads the hash on mount and selects the right section.
  // The pill itself is a shared-layout motion.span rendered only in the
  // active link — Framer Motion animates it sliding to wherever it
  // reappears, instead of each link owning a static highlight.
  const desktopClass = (active: boolean) =>
    `relative flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
      active
        ? 'text-foreground border-border'
        : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/40'
    }`

  const desktopPill = (
    <motion.span
      layoutId="desktop-nav-pill"
      className="absolute inset-0 -z-10 rounded-lg bg-accent/60"
      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
    />
  )

  const dockPill = (
    <motion.span
      layoutId="mobile-dock-pill"
      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
    />
  )

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-shrink-0 w-48 h-screen border-r border-border bg-background/95 backdrop-blur-sm flex-col justify-center px-3 py-8">
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
            const content = (
              <>
                {isActive && desktopPill}
                <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                {item.label}
              </>
            )
            return onBlog ? (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={() => gotoSection(item.id)}
                className={desktopClass(isActive)}
              >
                {content}
              </Link>
            ) : (
              <a key={item.id} href={`/#${item.id}`} className={desktopClass(isActive)}>
                {content}
              </a>
            )
          })}
        </nav>
      </aside>

      {/* ── Mobile floating dock — macOS-style, icons magnify toward the
          cursor and reveal their label as a tooltip instead of always
          showing text inline. ── */}
      <div className="lg:hidden fixed bottom-5 inset-x-0 z-50 flex justify-center px-4">
        <TooltipProvider delayDuration={150}>
          <Dock
            className="gap-2 rounded-full px-3 py-2"
            style={{
              background:
                'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
              backdropFilter: 'blur(16px) saturate(160%)',
              WebkitBackdropFilter: 'blur(16px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.10)',
            }}
          >
            {sectionItems.map((item) => {
              const isActive = activeId === item.id
              const Icon = item.icon
              const icon = (
                <DockIcon
                  className={
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground transition-colors hover:text-foreground'
                  }
                >
                  {isActive && dockPill}
                  <Icon className="h-[46%] w-[46%]" strokeWidth={2} />
                </DockIcon>
              )
              const trigger = onBlog ? (
                <Link href={`/#${item.id}`} onClick={() => gotoSection(item.id)}>
                  {icon}
                </Link>
              ) : (
                <a href={`/#${item.id}`}>{icon}</a>
              )
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                  <TooltipContent side="top">{item.label}</TooltipContent>
                </Tooltip>
              )
            })}
          </Dock>
        </TooltipProvider>
      </div>
    </>
  )
}
