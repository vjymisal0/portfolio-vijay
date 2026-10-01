'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Palette } from 'lucide-react'

// Dark-mode-only colour palettes. Values live in globals.css under
// `.dark[data-palette="…"]`; "classic" is the plain `.dark` default.
const palettes = [
  { id: 'classic', label: 'Classic', bg: '#0a0f1f', primary: '#f7a23b', accent: '#2ed3ea' },
  { id: 'violet', label: 'Violet & Mint', bg: '#100d17', primary: '#3dd9a0', accent: '#f26ba8' },
  { id: 'mono', label: 'Black & Blue', bg: '#0a0a0a', primary: '#3d94ff', accent: '#a5e53b' },
  { id: 'charcoal', label: 'Charcoal & Gold', bg: '#131210', primary: '#f4be37', accent: '#39c2b0' },
  { id: 'forest', label: 'Forest & Sand', bg: '#0b130f', primary: '#d9b98c', accent: '#e57a5c' },
  { id: 'midnight', label: 'Midnight & Coral', bg: '#0a1320', primary: '#f7705c', accent: '#fbcf4a' },
] as const

type PaletteId = (typeof palettes)[number]['id']

function applyPalette(id: PaletteId) {
  const root = document.documentElement
  if (id === 'classic') root.removeAttribute('data-palette')
  else root.setAttribute('data-palette', id)
  try { localStorage.setItem('palette', id) } catch {}
}

export default function PalettePicker() {
  const [isDark, setIsDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<PaletteId>('classic')
  const [pos, setPos] = useState({ top: 0, right: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  // Track the `dark` class so the picker appears/disappears with the theme toggle.
  useEffect(() => {
    const root = document.documentElement
    const sync = () => {
      const dark = root.classList.contains('dark')
      setIsDark(dark)
      if (!dark) setOpen(false)
    }
    sync()
    setCurrent((root.getAttribute('data-palette') as PaletteId | null) ?? 'classic')
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node
      if (!wrapperRef.current?.contains(t) && !menuRef.current?.contains(t)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', close)
    }
  }, [open])

  if (!isDark) return null

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={(e) => {
          // The navbar clips overflow and is transformed, so the menu is portalled
          // to <body> and fixed-positioned under the button.
          const r = e.currentTarget.getBoundingClientRect()
          setPos({ top: r.bottom + 8, right: Math.max(8, window.innerWidth - r.right) })
          setOpen((o) => !o)
        }}
        aria-label="Choose colour palette"
        aria-expanded={open}
        title="Colour palette"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
      >
        <Palette className="h-4 w-4" />
      </button>

      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={menuRef}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            aria-label="Colour palettes"
            style={{ top: pos.top, right: pos.right }}
            className="fixed z-50 w-52 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl"
          >
            {palettes.map((p) => {
              const selected = p.id === current
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      applyPalette(p.id)
                      setCurrent(p.id)
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:bg-secondary ${selected ? 'bg-secondary' : ''}`}
                  >
                    <span className="flex h-5 w-9 shrink-0 overflow-hidden rounded-md border border-white/10" aria-hidden>
                      <span className="flex-1" style={{ background: p.bg }} />
                      <span className="flex-1" style={{ background: p.primary }} />
                      <span className="flex-1" style={{ background: p.accent }} />
                    </span>
                    <span className="flex-1">{p.label}</span>
                    {selected && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </div>
  )
}
