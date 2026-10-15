'use client'

import HealthDiagram from '@/components/health-diagram'
import SystemMap from '@/components/system-map'
import { StepPlayer } from '@/components/ui/step-player'
import { Workflow } from 'lucide-react'

// Public page: describe what the automations do, never how the server is
// reached, scheduled, monitored, or secured. Keep it generic: no platform,
// channel, brand, language, or content-niche names.
const workflows = [
  {
    name: 'Scheduled content publishing workflow',
    description: 'Every day it finds trustworthy material, has AI turn it into content, double-checks the result, and publishes it. Running daily for months with almost no manual work. Built with n8n, Python, and AI models on a self-hosted server.',
    trigger: 'Scheduled',
    nodes: [
      { label: 'Source', detail: 'Starts from real, reliable source material. If there is none that day, it skips instead of letting the AI make something up.' },
      { label: 'Generate', detail: 'An AI model drafts the content. A second check compares it with the source to catch errors. If one AI model fails, it switches to a backup automatically.' },
      { label: 'Produce', detail: 'Turns the approved draft into the finished piece, ready to publish.' },
      { label: 'Publish', detail: 'Never posts the same thing twice. If publishing fails, it saves the work and retries on its own.' },
      { label: 'Report', detail: 'Every run records what happened: published, skipped, or failed. I only get an alert for real problems, so there is no noise.' },
    ],
    icon: Workflow,
  },
]

export default function Automation() {
  return (
    <section className="container mx-auto max-w-4xl px-6 lg:px-12">
      <div className="mb-10">
        <p className="mb-2 text-[11px] font-mono text-primary">$ ls ./systems</p>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Automation & workflows</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          I build systems that do a daily job on their own: AI creates the content, the system checks it, and it gets published on schedule with no one at the keyboard. The hard part is not the AI, it is trust. These systems would rather skip a day than publish something wrong, fix their own small hiccups, and only call me when something truly needs a human.
        </p>
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
        <h3 className="text-xl font-medium tracking-tight text-foreground">See it handle a bad day</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Pick a scenario and press play to watch a run step by step: a normal day, an AI mistake caught, a duplicate avoided, a day with nothing reliable to post, and a failed publish that recovers.
        </p>
      </div>

      <HealthDiagram />
    </section>
  )
}
