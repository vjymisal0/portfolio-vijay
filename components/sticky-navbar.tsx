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
  { id: 'projects', label: 'Projects', icon: FolderKanban },
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
  // reappears, instead of each link owning a static highlight.`

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
      <aside className="hidden lg:flex flex-shrink-0 w-52 h-screen sticky top-0 border-r border-border bg-background flex-col px-4 py-8">
        <div className="mb-10 flex items-center gap-2.5">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-foreground/5 font-serif text-[11px] font-bold text-foreground">
            VM
          </span>
          <span className="text-sm font-semibold text-foreground">Vijay Misal</span>
        </div>
        {/* Clean Pill Navigation */}
        <nav className="relative flex flex-col gap-1.5">
          {sectionItems.map((item) => {
            const isActive = activeId === item.id
            const Icon = item.icon
            
            const content = (
              <>
                <Icon className={"w-4 h-4 flex-shrink-0 transition-colors " + (isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="desktop-nav-pill"
                    className="absolute inset-0 rounded-lg bg-foreground/5 border border-border -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </>
            )
            
            const itemClass = "group relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-lg " + (isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")
            return onBlog ? (
              <Link
                key={item.id}
                href={"/#" + item.id}
                onClick={() => gotoSection(item.id)}
                className={itemClass}
              >
                {content}
              </Link>
            ) : (
              <a key={item.id} href={"/#" + item.id} className={itemClass}>
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
                <Link href={"/#" + item.id} onClick={() => gotoSection(item.id)}>
                  {icon}
                </Link>
              ) : (
                <a href={"/#" + item.id}>{icon}</a>
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
