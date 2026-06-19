'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Send, CheckCircle2, XCircle, Loader2 } from 'lucide-react'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'misalvijay153@gmail.com',
    href: 'mailto:misalvijay153@gmail.com',
    accent: 'bg-primary/10 text-primary',
  },
]

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="h-full flex flex-col justify-center py-8 px-6 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Get in Touch
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Left — info */}
          <motion.div
            className="flex flex-col justify-between gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                If you have something interesting, send a message and I&apos;ll get back to you.
              </p>

              <div className="space-y-3">
                {contactLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-card/70 transition-all duration-300 group"
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${link.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-muted-foreground/60 uppercase tracking-wider">{link.label}</p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {link.value}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="rounded-xl border border-border bg-card/40 p-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 py-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <p className="font-semibold text-foreground">Message sent!</p>
                <p className="text-xs text-muted-foreground">I&apos;ll get back to you as soon as possible.</p>
                <Button variant="ghost" size="sm" className="mt-2" onClick={() => setStatus('idle')}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/60 text-sm h-9"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/60 text-sm h-9"
                />
                <Textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/60 text-sm min-h-[120px] resize-none"
                />

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    Failed to send. Try again or email me directly.
                  </div>
                )}

                <Button type="submit" disabled={isLoading} className="gap-2 mt-1">
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
