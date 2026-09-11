'use client'

import { Bot, Clock3, GitBranch, Webhook, ArrowRight, Server } from 'lucide-react'

const workflows = [
  {
    name: 'Autonomous media pipeline',
    description: 'A scheduled workflow that coordinates AI processing, media generation, and publishing from a self-hosted VM with privacy-safe inputs and outputs.',
    trigger: 'Scheduled execution',
    nodes: ['Schedule', 'AI agent', 'Media pipeline', 'Publishing service'],
    icon: Server,
  },
  {
    name: 'Health & failover architecture',
    description: 'A resilient monitoring layer that checks services, captures failures, and dispatches actionable diagnostics before an issue becomes invisible.',
    trigger: 'Cron + error event',
    nodes: ['Health check', 'Decision branch', 'Recovery', 'Telegram alert'],
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
        <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.2em] text-primary">05 / Systems</p>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Automation & workflows</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          I won a cloud VM and turned it into a personal lab for learning by building. I use it to self-host n8n workflows, run scheduled jobs, experiment with AI agents, connect APIs, and explore the systems that make automation reliable.
        </p>
      </div>

      <figure className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <figcaption className="text-xs font-semibold text-foreground">VM health monitoring & failover</figcaption>
          <a href="/vm-health-failover.svg" target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary hover:underline">Open full diagram ↗</a>
        </div>
        <div className="overflow-x-auto bg-white p-3 sm:p-5">
          <object data="/vm-health-failover.svg" type="image/svg+xml" aria-label="VM health monitoring and failover flowchart" className="block h-auto min-h-[220px] w-full min-w-0 max-w-full object-contain object-left sm:min-h-[280px]" />
        </div>
      </figure>

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
            <div className="flex flex-wrap items-center gap-1.5" aria-label={`${name} architecture`}>
              {nodes.map((node, index) => (
                <span key={node} className="flex items-center gap-1.5">
                  <span className="rounded-md bg-secondary px-2 py-1 text-[10px] text-secondary-foreground">{node}</span>
                  {index < nodes.length - 1 && <ArrowRight className="h-3 w-3 text-primary" aria-hidden="true" />}
                </span>
              ))}
            </div>
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
