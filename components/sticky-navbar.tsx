'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, UserRound, FolderKanban, GitBranch } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { Dock, DockIcon } from '@/components/ui/dock'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const sectionItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'experience', label: 'Experience', icon: UserRound },
  { id: 'work', label: 'Background', icon: FolderKanban },
  { id: 'oss', label: 'Open Source', icon: GitBranch },
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
  // The desktop rail reads as a table of contents — a spine rule with a tick
  // per chapter — rather than the usual pill-highlight sidebar. The lit tick
  // is a shared-layout motion.span rendered only in the active link, so
  // Framer Motion animates it sliding along the spine to wherever it
  // reappears, instead of each link owning a static highlight.
  const desktopClass = (active: boolean) =>
    `group relative flex items-center gap-3 py-2.5 text-sm font-medium transition-colors ${
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`

  const desktopTick = (
    <motion.span
      layoutId="desktop-nav-tick"
      className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-primary ring-4 ring-primary/15"
      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
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
      <aside className="hidden lg:flex flex-shrink-0 w-52 h-screen border-r border-border bg-background/95 backdrop-blur-sm flex-col px-4 py-8">
        <div className="mb-10 flex items-center gap-2.5">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 font-mono text-[11px] font-bold text-primary">
            VM
          </span>
          <span className="text-sm font-semibold text-foreground">Vijay Misal</span>
        </div>

        {/* Table of contents — a spine rule with one tick per chapter,
            rather than a dashboard-style pill nav. */}
        <nav className="relative flex flex-col gap-1">
          <motion.span
            aria-hidden
            className="absolute left-2 top-1 bottom-1 w-px origin-top bg-border"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          />
          {sectionItems.map((item, i) => {
            const isActive = activeId === item.id
            const content = (
              <>
                <span className="relative h-4 w-4 flex-shrink-0">
                  {isActive ? (
                    desktopTick
                  ) : (
                    <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-border transition-colors group-hover:bg-muted-foreground/60" />
                  )}
                </span>
                <span className="w-5 flex-shrink-0 font-mono text-[10px] text-muted-foreground/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
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

        <a
          href="https://github.com/vjymisal0"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center gap-2 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <FaGithub className="h-3.5 w-3.5 flex-shrink-0" />
          @vjymisal0
        </a>
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
                'linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)',
              backdropFilter: 'blur(8px) saturate(160%)',
              WebkitBackdropFilter: 'blur(8px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
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
