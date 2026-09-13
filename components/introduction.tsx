import { ArrowRight, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import GitHubCharts from './github-charts'

const highlights = [
  {
    label: '01 / Product engineering',
    title: 'Shipping at Loopr AI',
    description: 'Full-stack platform features, API authentication, and production fixes for AI-powered visual inspection.',
    href: '#experience',
    action: 'See my experience',
  },
  {
    label: '02 / Automation',
    title: 'Systems beyond the demo',
    description: 'Self-hosted workflows, scheduled jobs, and health checks with recovery paths and actionable alerts.',
    href: '#builds',
    action: 'Explore build systems',
  },
]

export default function Introduction() {
  return (
    <section aria-labelledby="intro-title" className="container mx-auto max-w-4xl px-6 pb-16 lg:px-12">
      <div className="max-w-3xl">
        <p className="mb-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Vijay Misal <span aria-hidden="true" className="mx-2 text-primary">/</span> Pune, India
        </p>
        <h1 id="intro-title" className="font-mono text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Software engineer,<br />
          <span className="text-primary">building with AI.</span>
        </h1>
        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
          I&apos;m Vijay, an SDE 1 at Loopr AI. I build full-stack software and automated workflows, combining AI tools such as Hermes Agent, Pi Agent, Claude, and ChatGPT with reliable engineering practices.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#builds" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Explore my work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href="mailto:misalvijay153@gmail.com" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
            <Mail className="h-4 w-4" aria-hidden="true" /> Get in touch
          </a>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
          <p>React · TypeScript · NestJS · n8n</p>
          <nav aria-label="Social profiles" className="flex gap-5">
            <a href="https://github.com/vjymisal0" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-primary">
              <FaGithub className="h-4 w-4" aria-hidden="true" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/vijaymisal/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-primary">
              <FaLinkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
            </a>
          </nav>
        </div>
      </div>

      <section aria-labelledby="selected-work-title" className="mt-12 border-t border-border pt-8">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="selected-work-title" className="text-xl font-medium tracking-tight">What I work on</h2>
          <span className="text-xs text-muted-foreground">Product code to production workflows</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <a key={item.href} href={item.href} className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/60">
              <span className="text-[10px] uppercase tracking-widest text-primary">{item.label}</span>
              <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
              <p className="mb-6 mt-3 font-body text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs font-medium text-primary">
                {item.action} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-12 border-t border-border pt-8">
        <GitHubCharts />
        <a href="#oss" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">
          Explore my contributions <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
