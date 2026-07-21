'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, UserRound, FolderKanban, PenLine } from 'lucide-react'

const sectionItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'experience', label: 'Experience', icon: UserRound },
  { id: 'work', label: 'Background', icon: FolderKanban },
]

const blogItem = { id: 'blog', label: 'Writings', icon: PenLine }

export default function StickyNavbar() {
  const navRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()
  const [hash, setHash] = useState('home')

  useEffect(() => {
    const applyHash = () => setHash(window.location.hash.replace('#', '') || 'home')
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const onBlog = pathname.startsWith('/blog')
  const activeId = onBlog ? 'blog' : pathname === '/' ? hash : ''

  // Keep the active pill centered in the mobile scroller.
  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current
      const el = activeRef.current
      const scrollLeft = el.offsetLeft - nav.offsetWidth / 2 + el.offsetWidth / 2
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeId])

  // Section links behave differently depending on where we are:
  // - On '/', a native <a href="/#id"> changes only the hash (no reload) and
  //   fires 'hashchange', which swaps the section instantly.
  // - On '/blog', a native anchor to '/#id' would do a full-page reload (the
  //   lag). Use next/link instead for a client-side route change; the home page
  //   reads the hash on mount and selects the right section.
  const desktopClass = (active: boolean) =>
    `flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
      active
        ? 'text-foreground border-border bg-accent/60'
        : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/40'
    }`

  const mobileClass = (active: boolean) =>
    `flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap border transition-colors ${
      active
        ? 'border-white/25 bg-white/[0.06] text-foreground'
        : 'border-transparent text-muted-foreground hover:border-muted-foreground/40'
    }`

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
                <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                {item.label}
              </>
            )
            return onBlog ? (
              <Link key={item.id} href={`/#${item.id}`} className={desktopClass(isActive)}>
                {content}
              </Link>
            ) : (
              <a key={item.id} href={`/#${item.id}`} className={desktopClass(isActive)}>
                {content}
              </a>
            )
          })}

          <div className="my-2 h-px bg-border" />

          <Link href="/blog" className={desktopClass(activeId === 'blog')}>
            <blogItem.icon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
            {blogItem.label}
          </Link>
        </nav>
      </aside>

      {/* ── Mobile floating bottom nav ── */}
      <div className="lg:hidden fixed bottom-5 inset-x-0 z-50 flex justify-center px-4">
        <nav
          ref={navRef}
          className="nav-scroll flex items-center gap-1 overflow-x-auto max-w-full rounded-full px-2 py-1.5"
          style={{
            background:
              'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          {[...sectionItems, blogItem].map((item) => {
            const isActive = activeId === item.id
            const Icon = item.icon
            const content = (
              <>
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                <span>{item.label}</span>
              </>
            )
            if (item.id === 'blog') {
              return (
                <Link
                  key={item.id}
                  ref={isActive ? activeRef : null}
                  href="/blog"
                  className={mobileClass(isActive)}
                >
                  {content}
                </Link>
              )
            }
            return onBlog ? (
              <Link
                key={item.id}
                ref={isActive ? activeRef : null}
                href={`/#${item.id}`}
                className={mobileClass(isActive)}
              >
                {content}
              </Link>
            ) : (
              <a
                key={item.id}
                ref={isActive ? activeRef : null}
                href={`/#${item.id}`}
                className={mobileClass(isActive)}
              >
                {content}
              </a>
            )
          })}
        </nav>
      </div>
    </>
  )
}
