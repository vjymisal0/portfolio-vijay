'use client'

import { motion } from 'framer-motion'
import { ExternalLink, GitPullRequest, Package, Download } from 'lucide-react'
import { FaGithub, FaNpm } from 'react-icons/fa'
import { useState } from 'react'
import { techColor } from '@/lib/tech-colors'
import { contributions, packages, kindMeta } from '@/lib/data'
import OpenSourceCharts from './open-source-charts'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function SubHeading({ icon: Icon, children }: { icon: typeof Package; children: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {children}
      </span>
    </div>
  )
}

function CardFooterLink({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: typeof FaGithub
  children: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
    >
      <Icon className="w-3 h-3" /> {children}
    </a>
  )
}

export default function OpenSource() {
  const [showAllPRs, setShowAllPRs] = useState(false)
  const repoCount = new Set(contributions.map((c) => c.repo)).size

  const visibleContributions = showAllPRs ? contributions : contributions.slice(0, 6)

  return (
    <section className="container mx-auto px-6 lg:px-12 max-w-4xl">
      <div className="mb-10">
        <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-6">Open Source</h2>
        <div className="grid grid-cols-3 border-t border-l border-border rounded-lg overflow-hidden">
          {[
            { label: 'Pull requests merged', value: contributions.length },
            { label: 'Public repositories', value: repoCount },
            { label: 'Packages published', value: packages.length },
          ].map((stat) => (
            <div key={stat.label} className="border-b border-r border-border px-4 py-5 sm:px-6 sm:py-6">
              <div className="font-serif text-3xl sm:text-4xl font-medium text-foreground">{stat.value}</div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <OpenSourceCharts />

      <div className="space-y-12">
        {/* Pull requests */}
        <div>
          <SubHeading icon={GitPullRequest}>Contributions</SubHeading>
          <div className="flex flex-col border-t border-border mt-6">
            {visibleContributions.map((c) => {
              const meta = kindMeta[c.kind]
              const Icon = meta.icon
              return (
                <a
                  key={c.url}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 pl-4 -ml-4 pr-4 border-b border-l-2 border-l-transparent border-border transition-all duration-300 ease-out hover:border-l-foreground/40 hover:bg-foreground/[0.035] hover:shadow-sm rounded-r-lg"
                >
                  <div className="w-full sm:w-1/3 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <FaGithub className="w-4 h-4 text-muted-foreground" />
                      {c.repo}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      #{c.number} &middot; {formatDate(c.date)}
                    </span>
                  </div>

                  <div className="w-full sm:w-2/3 flex flex-col gap-3">
                    <p className="text-sm font-body text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors">
                      {c.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider font-semibold ${meta.color}`}>
                        <Icon className="w-3 h-3" /> {meta.label}
                      </span>
                      {c.techs?.length > 0 && (
                        <div className="flex items-center gap-2">
                          {c.techs.map(tech => (
                            <span key={tech} className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm border ${techColor(tech)}`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1 ml-auto">
                        View PR <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
          
          {contributions.length > 6 && (
            <div className="mt-8">
              <button
                onClick={() => setShowAllPRs(!showAllPRs)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                &rarr; {showAllPRs ? 'Show less' : `Show all ${contributions.length} contributions`}
              </button>
            </div>
          )}
        </div>

        {/* Published packages */}
        <div className="mt-20">
          <SubHeading icon={Package}>Packages</SubHeading>
          <div className="flex flex-col border-t border-border mt-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 pl-4 -ml-4 pr-4 border-b border-l-2 border-l-transparent border-border transition-all duration-300 ease-out hover:border-l-foreground/40 hover:bg-foreground/[0.035] hover:shadow-sm rounded-r-lg"
              >
                <div className="w-full sm:w-1/3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <FaNpm className="w-4 h-4 text-muted-foreground" />
                    {pkg.name}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <CardFooterLink href={pkg.npm} icon={Download}>npm</CardFooterLink>
                    <CardFooterLink href={pkg.github} icon={FaGithub}>Code</CardFooterLink>
                  </div>
                </div>

                <div className="w-full sm:w-2/3 flex flex-col gap-3">
                  <p className="text-sm font-body text-foreground/90 leading-relaxed">
                    {pkg.description}
                  </p>
                  <code className="inline-block self-start text-[11px] font-mono text-muted-foreground bg-foreground/5 rounded px-2 py-1">
                    {pkg.install}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Let's Connect CTA */}
        <div className="pt-24 mt-12">
          <div className="text-left border-t border-border pt-12">
            <h2 className="text-4xl sm:text-5xl font-serif text-foreground mb-6">Let's Connect.</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl">
              I'm always open to discussing new projects, open-source collaborations, or creative ideas.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="mailto:misalvijay153@gmail.com" className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background hover:opacity-90 px-6 py-3 rounded-full transition-opacity">
                Send an Email
              </a>
              <a href="https://www.linkedin.com/in/vijaymisal/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium border border-border hover:border-foreground/30 px-6 py-3 rounded-full transition-colors text-foreground">
                 LinkedIn Profile
              </a>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-16">
              This entire portfolio was vibe-coded and is maintained end-to-end with AI coding tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


