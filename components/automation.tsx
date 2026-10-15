'use client'

import HealthDiagram from '@/components/health-diagram'
import SystemMap from '@/components/system-map'
import { StepPlayer } from '@/components/ui/step-player'
import { Briefcase, Clapperboard, Newspaper } from 'lucide-react'

// Public page: describe what the automations do, never how the server is
// reached, scheduled, monitored, or secured.
const workflows = [
  {
    name: 'Hindi devotional Shorts, two YouTube channels',
    description: 'Writes, narrates, renders, and schedules Hindi Shorts every day on two channels. The AI script has to stay faithful to a source story, narration is synthesized locally, and every run reports what actually happened instead of trusting an exit code.',
    trigger: 'Scheduled',
    nodes: [
      { label: 'Topic', detail: 'Picks the day\'s topic only if it has a grounded source story. With no grounded topic, the slot is skipped rather than filled with an invented one.' },
      { label: 'Script', detail: 'An LLM writes the script as JSON. It is checked for schema, length, and stray Latin text, and a second pass checks it against the source story. A failing model falls back to the next one, then to a story corpus.' },
      { label: 'Narrate', detail: 'An open-source Indic text-to-speech model synthesizes Hindi narration locally, so there is no per-call API cost.' },
      { label: 'Render', detail: 'Assembles the video, burns in captions, and makes a thumbnail.' },
      { label: 'Upload', detail: 'Skips topics already on the channel and books the next free publish slot. A failed upload is queued and retried automatically.' },
      { label: 'Report', detail: 'Each run reports a status: uploaded, skipped, or failed. Only a real failure sends an alert; a deliberate skip does not.' },
    ],
    icon: Clapperboard,
  },
  {
    name: 'DailyJobs: Instagram job publisher',
    description: 'Posts entry-level India and remote IT jobs to Instagram as a carousel several times a day, and keeps the companion jobs site up to date.',
    trigger: 'Scheduled',
    nodes: [
      { label: 'Collect', detail: 'Gathers new entry-level IT jobs for India and remote roles.' },
      { label: 'Render', detail: 'Builds a carousel: a cover plus up to 5 job cards, at most 2 per company, so one employer cannot fill a post.' },
      { label: 'Publish', detail: 'Publishes the carousel through the Instagram API.' },
      { label: 'Keep the site fresh', detail: 'Closed listings are marked on the jobs site, and an alert fires if new jobs stop arriving.' },
      { label: 'Weekly report', detail: 'A weekly insights summary shows what each account\'s posts did.' },
    ],
    icon: Briefcase,
  },
  {
    name: 'Future Feed: daily AI news carousel',
    description: 'Researches the day\'s AI news from sources, renders an Instagram carousel, and publishes it on a schedule, with a dry-run mode to test changes without posting.',
    trigger: 'Scheduled',
    nodes: [
      { label: 'Research', detail: 'Gathers source-led AI news stories for the day.' },
      { label: 'Render', detail: 'Writes the carousel and renders the slides.' },
      { label: 'Publish', detail: 'Publishes to Instagram and sends me a summary of the post.' },
      { label: 'Fail loudly', detail: 'A failed publish marks the whole run as failed, so it can never show green by accident.' },
      { label: 'Dry run', detail: 'A separate mode runs research and render without publishing, for testing changes safely.' },
    ],
    icon: Newspaper,
  },
]

export default function Automation() {
  return (
    <section className="container mx-auto max-w-4xl px-6 lg:px-12">
      <div className="mb-10">
        <p className="mb-2 text-[11px] font-mono text-primary">$ ls ./systems</p>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Automation & workflows</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          I run self-hosted automations that publish content every day without me touching them, built with n8n, Python, and AI models. They are designed to skip rather than publish something wrong, retry what is safe to retry, and alert me only when something really failed.
        </p>
        <div className="mt-6 inline-flex items-baseline gap-2 rounded-xl border border-border bg-card px-4 py-3">
          <span className="text-2xl font-medium tracking-tight text-foreground">352</span>
          <span className="text-[11px] text-muted-foreground">Shorts published (Oct 2026)</span>
        </div>
      </div>

      <SystemMap />

      <div className="mb-16 grid gap-4">
        {workflows.map(({ name, description, trigger, nodes, icon: Icon }) => (
          <article key={name} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></div>
                <h3 className="text-base font-semibold text-foreground">{name}</h3>
              </div>
              <span className="shrink-0 rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground">{trigger}</span>
            </div>
            <p className="mb-5 text-xs leading-relaxed text-muted-foreground">{description}</p>
            <StepPlayer steps={nodes} name={name} />
          </article>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium tracking-tight text-foreground">How a Shorts run actually goes</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The branches follow the production pipeline: what happens on a duplicate, a bad AI script, a day with no grounded topic, or a failed upload.
        </p>
      </div>

      <HealthDiagram />
    </section>
  )
}
