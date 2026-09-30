'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Check, Clock3, Flag, GitBranch, Play, RotateCcw, Square } from 'lucide-react'
import { workflows, type FlowNode, type Workflow } from '@/lib/workflows'

const STEP_MS = 650

const kindIcon = { trigger: Clock3, step: Square, decision: GitBranch, end: Flag }

function NodeCard({ node, labels, state }: { node: FlowNode; labels: Map<string, string>; state: 'idle' | 'visited' | 'active' }) {
  const Icon = kindIcon[node.kind]
  const tone =
    state === 'active'
      ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
      : state === 'visited'
        ? 'border-primary/40 bg-card'
        : 'border-border bg-card'

  return (
    <li
      data-node={node.id}
      data-state={state}
      className={`rounded-xl border px-3 py-2.5 transition-all duration-300 ${tone} ${node.kind === 'decision' ? 'border-dashed' : ''} ${node.kind === 'trigger' || node.kind === 'end' ? 'rounded-full' : ''}`}
    >
      <div className="flex items-center gap-2 text-[13px] font-medium text-foreground">
        <Icon className={`h-3.5 w-3.5 shrink-0 ${state === 'idle' ? 'text-muted-foreground' : 'text-primary'}`} aria-hidden="true" />
        <span className="min-w-0 flex-1">{node.label}</span>
        {state === 'visited' && <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-label="visited" />}
      </div>
      {node.kind === 'decision' && node.next && (
        <ul className="mt-2 flex flex-wrap gap-1.5 pl-5">
          {node.next.map((edge) => (
            <li key={edge.to + edge.label} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground">
              <span className="font-semibold">{edge.label}</span> → {labels.get(edge.to)}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

function FlowRunner({ flow }: { flow: Workflow }) {
  const reduceMotion = useReducedMotion()
  const [scenario, setScenario] = useState(0)
  const [cursor, setCursor] = useState(-1) // index of the active step; -1 = idle
  const [running, setRunning] = useState(false)
  const logRef = useRef<HTMLOListElement>(null)

  const labels = useMemo(() => new Map(flow.stages.flatMap((s) => s.nodes.map((n) => [n.id, n.label] as const))), [flow])
  const steps = flow.scenarios[scenario].steps

  useEffect(() => {
    if (!running) return
    if (cursor >= steps.length - 1) { setRunning(false); return }
    const t = setTimeout(() => setCursor((c) => c + 1), cursor < 0 ? 0 : STEP_MS)
    return () => clearTimeout(t)
  }, [running, cursor, steps.length])

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [cursor])

  const run = (index: number) => {
    setScenario(index)
    if (reduceMotion) {
      setCursor(flow.scenarios[index].steps.length - 1)
      setRunning(false)
    } else {
      setCursor(-1)
      setRunning(true)
    }
  }
  const reset = () => { setRunning(false); setCursor(-1) }

  const visited = new Set(steps.slice(0, Math.max(cursor, 0)).map((s) => s.node))
  const active = cursor >= 0 ? steps[cursor].node : null
  const stateOf = (id: string) => (id === active ? 'active' : visited.has(id) ? 'visited' : 'idle')

  return (
    <figure className="mb-8 overflow-hidden rounded-2xl border border-border bg-card" aria-labelledby={`${flow.id}-title`}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <figcaption id={`${flow.id}-title`} className="text-sm font-semibold">{flow.title}</figcaption>
          <p className="mt-1 text-[11px] text-muted-foreground">{flow.summary}</p>
        </div>
        <div role="group" aria-label={`Run a ${flow.title} scenario`} className="flex flex-wrap items-center gap-1.5">
          {flow.scenarios.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => run(i)}
              aria-pressed={scenario === i && cursor >= 0}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-medium transition-colors ${
                scenario === i && cursor >= 0 ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary hover:text-primary'
              }`}
            >
              <Play className="h-3 w-3" aria-hidden="true" /> {s.name}
            </button>
          ))}
          <button type="button" onClick={reset} aria-label={`Reset ${flow.title}`} className="inline-flex min-h-9 items-center rounded-lg border border-border px-2.5 text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 bg-background p-4 md:grid-cols-3">
        {flow.stages.map((stage) => (
          <section key={stage.title} aria-label={stage.title}>
            <h4 className="mb-2 text-[10px] font-mono uppercase tracking-widest text-primary">{stage.title}</h4>
            <ol className="space-y-2">
              {stage.nodes.map((node) => <NodeCard key={node.id} node={node} labels={labels} state={stateOf(node.id)} />)}
            </ol>
          </section>
        ))}
      </div>

      <ol
        ref={logRef}
        aria-live="polite"
        aria-label={`${flow.title} run log`}
        className="h-36 overflow-y-auto border-t border-border bg-foreground/[0.03] px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground"
      >
        {cursor < 0 ? (
          <li className="text-muted-foreground/70">Pick a scenario to trace a run through the workflow.</li>
        ) : (
          steps.slice(0, cursor + 1).map((s, i) => (
            <li key={i} className={i === cursor ? 'text-foreground' : undefined}>
              <span className="text-primary">{String(i + 1).padStart(2, '0')}</span>{' '}
              <span className="text-foreground/70">[{labels.get(s.node)}]</span> {s.log}
            </li>
          ))
        )}
      </ol>
      <p className="border-t border-border px-4 py-3 text-[11px] text-muted-foreground">Simulated runs of the workflow logic. Architecture illustration, not live service status.</p>
    </figure>
  )
}

export default function HealthDiagram() {
  return <div className="min-w-0">{workflows.map((flow) => <FlowRunner key={flow.id} flow={flow} />)}</div>
}
