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
    description: 'Generates content with AI, checks it, and publishes it on a schedule. Every run reports what actually happened instead of trusting an exit code.',
    trigger: 'Scheduled',
    nodes: [
      { label: 'Source', detail: 'Starts only when there is grounded source material. With nothing grounded, the run is skipped rather than filled with invented content.' },
      { label: 'Generate', detail: 'An LLM produces structured output. It is validated against a schema and checked against its source. A failing model falls back to the next one.' },
      { label: 'Produce', detail: 'Turns the validated output into the final asset.' },
      { label: 'Publish', detail: 'Skips anything already published. A failed publish is queued and retried automatically.' },
      { label: 'Report', detail: 'Each run reports a status: published, skipped, or failed. Only a real failure sends an alert; a deliberate skip does not.' },
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
          I run self-hosted automations that publish content every day without me touching them, built with n8n, Python, and AI models. They are designed to skip rather than publish something wrong, retry what is safe to retry, and alert me only when something really failed.
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
        <h3 className="text-xl font-medium tracking-tight text-foreground">How a run actually goes</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The branches follow the production pipeline: what happens on a duplicate, bad AI output, no grounded source, or a failed publish.
        </p>
      </div>

      <HealthDiagram />
    </section>
  )
}
