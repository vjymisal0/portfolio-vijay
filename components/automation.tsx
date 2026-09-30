'use client'

import HealthDiagram from '@/components/health-diagram'
import { StepPlayer } from '@/components/ui/step-player'
import { Bot, Clock3, GitBranch, Webhook, Server } from 'lucide-react'

const workflows = [
  {
    name: 'Autonomous media pipeline',
    description: 'A scheduled workflow that coordinates AI processing, media generation, and publishing from a self-hosted VM with privacy-safe inputs and outputs.',
    trigger: 'Scheduled execution',
    nodes: [
      { label: 'Schedule', detail: 'A cron trigger on the self-hosted VM starts the run, so nothing depends on someone being online.' },
      { label: 'AI agent', detail: 'An AI step prepares the content for this run from privacy-safe inputs.' },
      { label: 'Media pipeline', detail: 'The generated content is turned into publishable media assets.' },
      { label: 'Publishing service', detail: 'The finished output is pushed to the publishing service and the run completes.' },
    ],
    icon: Server,
  },
  {
    name: 'Health & failover architecture',
    description: 'A resilient monitoring layer that checks services, captures failures, and dispatches actionable diagnostics before an issue becomes invisible.',
    trigger: 'Cron + error event',
    nodes: [
      { label: 'Health check', detail: 'Scheduled checks and error events probe each service.' },
      { label: 'Decision branch', detail: 'The workflow branches on the result: healthy runs end quietly, failures continue.' },
      { label: 'Recovery', detail: 'Failure details are captured and a recovery path is attempted.' },
      { label: 'Telegram alert', detail: 'Actionable diagnostics are sent to Telegram so the issue never goes unnoticed.' },
    ],
    icon: Bot,
  },
]

const capabilities = [
  ['Triggers', 'Cron jobs, webhooks, schedules, and application events'],
  ['Orchestration', 'n8n workflows, branching logic, retries, and conditional routing'],
  ['Integrations', 'REST APIs, notifications, databases, and external services'],
  ['Reliability', 'Health checks, logs, failure handling, and alerting'],
]

export default function Automation() {
  return (
    <section className="container mx-auto max-w-4xl px-6 lg:px-12">
      <div className="mb-10">
        <p className="mb-2 text-[11px] font-mono text-primary">$ ls ./systems</p>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Automation & workflows</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          I own a cloud VM & use it for learning by building. I use it to self-host n8n workflows, run scheduled jobs, experiment with AI agents, connect APIs, and explore the systems that make automation reliable.
        </p>
      </div>

      <HealthDiagram />

      <div className="grid gap-5 md:grid-cols-2">
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

      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {capabilities.map(([label, text], index) => {
          const Icon = [Clock3, GitBranch, Webhook, Bot][index]
          return <div key={label} className="bg-card p-4"><div className="mb-2 flex items-center gap-2 text-xs font-semibold text-foreground"><Icon className="h-3.5 w-3.5 text-primary" />{label}</div><p className="text-xs leading-relaxed text-muted-foreground">{text}</p></div>
        })}
      </div>
    </section>
  )
}
