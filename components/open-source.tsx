'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, GitPullRequest, Package, Star } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useState } from 'react'
import { TechBadge } from './tech-badge'
import { contributions, packages, kindMeta, featuredContributions } from '@/lib/data'
import { AnnotatedText } from '@/components/ui/annotated-text'
import GitHubCharts from './github-charts'
import CollapsibleSection from '@/components/ui/collapsible-section'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function SubHeading({ icon: Icon, children }: { icon: typeof Package; children: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {children}
      </span>
    </div>
  )
}

export default function OpenSource() {
  const [showAllPRs, setShowAllPRs] = useState(false)
  const repoCount = new Set(contributions.map((c) => c.repo)).size

  const visibleContributions = showAllPRs ? contributions : contributions.slice(0, 6)

  return (
    <section className="container mx-auto px-6 lg:px-12 max-w-4xl">
      <div className="mb-12">
        <p className="mb-2 text-[11px] font-mono text-primary">$ cat contributions.md</p><h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-3">Open Source</h2>
        <p className="text-sm sm:text-base font-body text-muted-foreground leading-relaxed">
          Pull requests merged across {repoCount} repositories <AnnotatedText variant="box" color="text-primary">I don&apos;t own</AnnotatedText>, from large projects to small tools I found useful. The featured ones explain what each change fixed.{' '}
          <Link href="/#builds" className="underline underline-offset-2 hover:text-foreground transition-colors">My own npm packages &rarr;</Link>
        </p>
      </div>

      <div className="space-y-12">
        {/* Featured pull requests */}
        <div>
          <SubHeading icon={Star}>Featured</SubHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featuredContributions.map(({ url, why }) => {
              const c = contributions.find((x) => x.url === url)
              if (!c) return null
              return (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Image src={`https://avatars.githubusercontent.com/${c.repo.split('/')[0]}?s=48`} alt="" width={20} height={20} className="h-5 w-5 rounded-full" />
                    {c.repo}
                    <span className="ml-auto text-xs font-mono font-normal text-muted-foreground">#{c.number}</span>
                  </div>
                  <p className="text-sm font-body leading-relaxed text-muted-foreground">{why}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                    View PR <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Pull requests */}
        <div>
          <CollapsibleSection
            header={<SubHeading icon={GitPullRequest}>All merged pull requests</SubHeading>}
            summary={`${contributions.length} pull requests across ${repoCount} repositories`}
          >
          <div className="flex flex-col border-t border-border">
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
                            <TechBadge key={tech} tech={tech} />
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
          </CollapsibleSection>
        </div>

        <GitHubCharts />

        {/* Let's Connect CTA */}
        <div className="pt-24 mt-12">
          <div className="text-left border-t border-border pt-12">
            <h2 className="text-3xl sm:text-4xl font-mono font-medium tracking-tight text-foreground mb-6"><AnnotatedText variant="doubleUnderline" color="text-primary">Let's Connect.</AnnotatedText></h2>
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
              Designed, built, and maintained with AI coding tools, including Claude Code.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


