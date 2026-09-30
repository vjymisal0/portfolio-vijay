'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Boxes, Briefcase, Check, Copy, CornerDownLeft, GitPullRequest, Home, Package, Search } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const EMAIL = 'misalvijay153@gmail.com'

type Command = {
  id: string
  label: string
  group: 'Navigate' | 'Links' | 'Actions'
  icon: ComponentType<{ className?: string }>
  keywords?: string
  run: () => void | Promise<void>
}

export const OPEN_COMMAND_BAR = 'open-command-bar'

const go = (hash: string) => { window.location.hash = hash }
const open = (url: string) => { window.open(url, '_blank', 'noopener,noreferrer') }

export default function CommandBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo<Command[]>(() => [
    { id: 'home', label: 'Home', group: 'Navigate', icon: Home, run: () => go('home') },
    { id: 'experience', label: 'Experience', group: 'Navigate', icon: Briefcase, keywords: 'career work education', run: () => go('experience') },
    { id: 'builds', label: 'Build Systems', group: 'Navigate', icon: Boxes, keywords: 'projects packages automation', run: () => go('builds') },
    { id: 'oss', label: 'Open Source', group: 'Navigate', icon: GitPullRequest, keywords: 'contributions pull requests', run: () => go('oss') },
    { id: 'github', label: 'GitHub profile', group: 'Links', icon: FaGithub, run: () => open('https://github.com/vjymisal0') },
    { id: 'linkedin', label: 'LinkedIn', group: 'Links', icon: FaLinkedin, run: () => open('https://www.linkedin.com/in/vijaymisal/') },
    { id: 'npm', label: 'npm packages', group: 'Links', icon: Package, run: () => open('https://www.npmjs.com/~vjymisal0') },
    {
      id: 'email', label: 'Copy email address', group: 'Actions', icon: Copy, keywords: 'contact mail',
      run: async () => {
        await navigator.clipboard.writeText(EMAIL)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      },
    },
  ], [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.keywords ?? ''} ${c.group}`.toLowerCase().includes(q))
  }, [commands, query])

  const close = useCallback(() => { setIsOpen(false); setQuery(''); setIndex(0) }, [])

  const execute = useCallback(async (cmd: Command | undefined) => {
    if (!cmd) return
    await cmd.run()
    if (cmd.id !== 'email') close()
  }, [close])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((o) => !o)
      }
    }
    const onOpen = () => setIsOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_COMMAND_BAR, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_COMMAND_BAR, onOpen)
    }
  }, [])

  useEffect(() => { if (isOpen) inputRef.current?.focus() }, [isOpen])
  useEffect(() => { setIndex(0) }, [query])

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); execute(results[index]) }
  }

  const groups = ['Navigate', 'Links', 'Actions'] as const

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-background/60 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command bar"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Type a command or search..."
                aria-label="Search commands"
                className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">Esc</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2" role="listbox">
              {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-muted-foreground">No results.</p>}
              {groups.map((group) => {
                const items = results.filter((c) => c.group === group)
                if (items.length === 0) return null
                return (
                  <div key={group} className="mb-1">
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{group}</p>
                    {items.map((cmd) => {
                      const i = results.indexOf(cmd)
                      const selected = i === index
                      const Icon = cmd.id === 'email' && copied ? Check : cmd.icon
                      return (
                        <button
                          key={cmd.id}
                          role="option"
                          aria-selected={selected}
                          onMouseMove={() => setIndex(i)}
                          onClick={() => execute(cmd)}
                          className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${selected ? 'text-foreground' : 'text-muted-foreground'}`}
                        >
                          {selected && (
                            <motion.span layoutId="command-highlight" className="absolute inset-0 rounded-lg bg-primary/10" transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }} />
                          )}
                          <Icon className={`relative h-4 w-4 ${selected ? 'text-primary' : ''}`} />
                          <span className="relative flex-1">{cmd.id === 'email' && copied ? 'Copied!' : cmd.label}</span>
                          {selected && <CornerDownLeft className="relative h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
