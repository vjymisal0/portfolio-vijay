'use client'

import HealthDiagram from '@/components/health-diagram'
import SystemMap from '@/components/system-map'
import { StepPlayer } from '@/components/ui/step-player'
import { Server } from 'lucide-react'

const workflows = [
  {
    name: 'Scheduled AI media pipeline',
    description: 'Turns approved input into a narrated video and publishes it on a schedule. The AI output is validated before anything is rendered, and every run is logged.',
    trigger: 'Cron · n8n',
    nodes: [
      { label: 'Schedule', detail: 'A cron trigger in n8n starts the run on the VM, so publishing never waits on me.' },
      { label: 'Collect input', detail: 'Pulls the next approved topic from the queue. Nothing unreviewed goes in.' },
      { label: 'AI plan', detail: 'An AI agent writes a structured plan: script, scenes, and metadata as JSON.' },
      { label: 'Validate', detail: 'The plan is checked against a schema. A bad plan retries, and repeated failures send a Telegram alert.' },
      { label: 'Render', detail: 'Text-to-speech narrates the script and the media step assembles the video.' },
      { label: 'Publish & log', detail: 'The video is uploaded through the publishing API and the run is written to an execution log.' },
    ],
    icon: Server,
  },
]

export default function Automation() {
  return (
    <section className="container mx-auto max-w-4xl px-6 lg:px-12">
      <div className="mb-10">
        <p className="mb-2 text-[11px] font-mono text-primary">$ ls ./systems</p>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Automation & workflows</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          I run a self-hosted VM where I build and operate n8n workflows: scheduled jobs, webhook integrations, and AI agents. It is also where I practice the unglamorous parts of automation: health checks, retries, and alerts.
        </p>
      </div>

      <SystemMap />

      <HealthDiagram />

      <div>
        {workflows.map(({ name, description, trigger, nodes, icon: Icon }) => (
          <article key={name} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></div>
                <h3 className="text-base font-semibold text-foreground">{name}</h3>
              </div>
              <span className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground">{trigger}</span>
            </div>
            <p className="mb-5 text-xs leading-relaxed text-muted-foreground">{description}</p>
            <StepPlayer steps={nodes} name={name} />
          </article>
        ))}
      </div>
    </section>
  )
}
