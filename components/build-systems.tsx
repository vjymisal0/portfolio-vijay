import Automation from '@/components/automation'
import CaseStudy from '@/components/case-study'
import Projects from '@/components/projects'
import { packages } from '@/lib/data'

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`)

export default function BuildSystems() {
  const monthlyDownloads = packages.reduce((sum, p) => sum + p.monthlyDownloads, 0)
  const stats = [
    { value: '1', label: 'AI system running daily' },
    { value: '2', label: 'apps live in production' },
    { value: `${packages.length}`, label: 'npm packages maintained' },
    { value: `~${formatCount(monthlyDownloads)}`, label: 'package downloads a month' },
  ]

  return (
    <section className="container mx-auto max-w-4xl px-6 lg:px-12">
      <header className="mb-12">
        <p className="mb-2 text-[11px] font-mono text-primary">$ ls ./builds</p>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Things I&apos;ve built</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          I build software that keeps working after the demo: systems that run on their own, apps people use, and libraries other developers install. Each one below starts with the problem, the decision that shaped it, and what came of it.
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-xl border border-border bg-card px-4 py-3">
              <dt className="sr-only">{label}</dt>
              <dd className="text-2xl font-medium tracking-tight text-foreground">{value}</dd>
              <dd className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mb-20 space-y-6">
        <Automation />
        <CaseStudy
          category="Developer tools"
          status="Building"
          title="OSS Tracker"
          summary="One dashboard that shows an open-source contributor what needs their attention next, across every repository they work in."
          technologies={['TypeScript', 'Next.js', 'PostgreSQL', 'Redis', 'Docker']}
          github="https://github.com/vjymisal0/oss-tracker"
        />
        <CaseStudy
          category="Real-time app"
          status="Completed"
          title="Chat app with sentiment analysis"
          summary="A chat app that reads the mood of a conversation as it happens and turns it into charts and a shareable report."
          problem="Chat history shows what people said, but not how a conversation felt or how that changed over time."
          built="A real-time chat app that scores each message as positive, neutral, or negative when it arrives, charts the trend per person and per conversation, and exports it as a PDF."
          decision="Built on Firebase for sign-in, storage, and live updates, so the effort went into the analysis and charts instead of running servers."
          result="Live and usable in the browser, with sentiment updating instantly as messages come in."
          technologies={['React', 'Firebase', 'Chart.js', 'JavaScript']}
          live="https://chatapp-ai-tan.vercel.app"
        />
      </div>

      <Projects />
    </section>
  )
}
