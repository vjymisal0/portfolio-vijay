'use client'

import HealthDiagram from '@/components/health-diagram'
import SystemMap from '@/components/system-map'
import { StepPlayer } from '@/components/ui/step-player'
import { Clapperboard, FileSearch, LayoutGrid } from 'lucide-react'

// Public page: describe what the automations do, never how the server is
// reached, scheduled, monitored, or secured. Keep it generic: no platform,
// channel, brand, language, or content-niche names.
const workflows = [
  {
    name: 'Daily short-form video pipeline',
    description: 'Writes, narrates, renders, and schedules short-form videos every day on a video platform. The AI script has to stay faithful to its source material, narration is synthesized locally, and every run reports what actually happened instead of trusting an exit code.',
    trigger: 'Scheduled',
    nodes: [
      { label: 'Topic', detail: 'Picks the day\'s topic only if it has grounded source material. With no grounded topic, the slot is skipped rather than filled with an invented one.' },
      { label: 'Script', detail: 'An LLM writes the script as JSON. It is checked for schema, length, and stray Latin text, and a second pass checks it against the source. A failing model falls back to the next one, then to a curated corpus.' },
      { label: 'Narrate', detail: 'An open-source text-to-speech model synthesizes the narration locally, so there is no per-call API cost.' },
      { label: 'Render', detail: 'Assembles the video, burns in captions, and makes a thumbnail.' },
      { label: 'Upload', detail: 'Skips topics already published and books the next free publish slot. A failed upload is queued and retried automatically.' },
      { label: 'Report', detail: 'Each run reports a status: uploaded, skipped, or failed. Only a real failure sends an alert; a deliberate skip does not.' },
    ],
    icon: Clapperboard,
  },
  {
    name: 'Listings-to-carousel publisher',
    description: 'Collects fresh listings from external sources, posts them to social media as a carousel several times a day, and keeps a companion website in sync.',
    trigger: 'Scheduled',
    nodes: [
      { label: 'Collect', detail: 'Pulls new listings from external sources and drops ones already seen.' },
      { label: 'Render', detail: 'Builds a carousel: a cover plus up to 5 cards, at most 2 per source, so no single source can fill a post.' },
      { label: 'Publish', detail: 'Publishes the carousel through the platform\'s API.' },
      { label: 'Keep the site fresh', detail: 'Expired listings are marked on the site, and an alert fires if new listings stop arriving.' },
      { label: 'Weekly report', detail: 'A weekly insights summary shows how the posts performed.' },
    ],
    icon: LayoutGrid,
  },
  {
    name: 'Research-to-post publisher',
    description: 'Researches the day\'s updates from trusted sources, renders a carousel, and publishes it to social media on a schedule, with a dry-run mode to test changes without posting.',
    trigger: 'Scheduled',
    nodes: [
      { label: 'Research', detail: 'Gathers source-cited stories for the day.' },
      { label: 'Render', detail: 'Writes the carousel and renders the slides.' },
      { label: 'Publish', detail: 'Publishes the post and sends me a summary.' },
      { label: 'Fail loudly', detail: 'A failed publish marks the whole run as failed, so it can never show green by accident.' },
      { label: 'Dry run', detail: 'A separate mode runs research and render without publishing, for testing changes safely.' },
    ],
    icon: FileSearch,
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
          <span className="text-[11px] text-muted-foreground">videos published (Oct 2026)</span>
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
        <h3 className="text-xl font-medium tracking-tight text-foreground">How a video run actually goes</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The branches follow the production pipeline: what happens on a duplicate, a bad AI script, a day with no grounded topic, or a failed upload.
        </p>
      </div>

      <HealthDiagram />
    </section>
  )
}
