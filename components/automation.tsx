'use client'

import { Bot, Clock3, GitBranch, Webhook, ArrowRight, Server } from 'lucide-react'

const workflows = [
  {
    name: 'Autonomous media production',
    description: 'A scheduled content pipeline that coordinates topic generation, media production, text-to-speech, and publishing from a self-hosted VM.',
    trigger: 'Scheduled execution',
    nodes: ['Schedule', 'AI agent', 'Media pipeline', 'YouTube publish'],
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
          I design automation architectures that connect infrastructure, APIs, and AI agents into dependable workflows. These systems run on my Oracle Cloud VM using self-hosted n8n, cron jobs, Docker services, and monitoring.
        </p>
      </div>

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
