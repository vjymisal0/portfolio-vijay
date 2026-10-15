// Workflow diagrams as data. components/health-diagram.tsx lays these out and
// replays each scenario step by step. The branches mirror the production
// pipeline; the runs themselves are simulated, not live service status.
// Keep this public-safe: no hosts, schedules, file names, credentials,
// platform names, or content niches.

export type NodeKind = 'trigger' | 'step' | 'decision' | 'end'

export type FlowNode = {
  id: string
  label: string
  kind: NodeKind
  // Outgoing edges. Decisions label each branch; steps usually have one.
  next?: { to: string; label?: string }[]
}

export type Stage = { title: string; nodes: FlowNode[] }

export type Scenario = {
  name: string
  // Each step names the node it lights up and the log line it prints.
  steps: { node: string; log: string }[]
}

export type Workflow = {
  id: string
  title: string
  summary: string
  stages: Stage[]
  scenarios: Scenario[]
}

export const workflows: Workflow[] = [
  {
    id: 'publish-run',
    title: 'Publish run',
    summary: 'Source → AI generate → validate → produce → publish → report',
    stages: [
      {
        title: '01 / Pick & write',
        nodes: [
          { id: 'trigger', label: 'Scheduled run', kind: 'trigger', next: [{ to: 'topic' }] },
          { id: 'topic', label: 'Grounded source available?', kind: 'decision', next: [{ to: 'script', label: 'Yes' }, { to: 'skip', label: 'No' }] },
          { id: 'script', label: 'LLM generates output (JSON)', kind: 'step', next: [{ to: 'valid' }] },
          { id: 'valid', label: 'Valid and faithful to source?', kind: 'decision', next: [{ to: 'tts', label: 'Yes' }, { to: 'fallback', label: 'No' }] },
          { id: 'fallback', label: 'Fall back to next model', kind: 'step', next: [{ to: 'valid' }] },
        ],
      },
      {
        title: '02 / Produce & publish',
        nodes: [
          { id: 'tts', label: 'Prepare assets', kind: 'step', next: [{ to: 'render' }] },
          { id: 'render', label: 'Produce final output', kind: 'step', next: [{ to: 'dup' }] },
          { id: 'dup', label: 'Already published?', kind: 'decision', next: [{ to: 'skip', label: 'Yes' }, { to: 'upload', label: 'No' }] },
          { id: 'upload', label: 'Publish to next free slot', kind: 'step', next: [{ to: 'uploaded' }] },
          { id: 'uploaded', label: 'Publish OK?', kind: 'decision', next: [{ to: 'result', label: 'Yes' }, { to: 'queue', label: 'No' }] },
        ],
      },
      {
        title: '03 / Report',
        nodes: [
          { id: 'skip', label: 'Skip slot, nothing published', kind: 'step', next: [{ to: 'result' }] },
          { id: 'queue', label: 'Queue for retry', kind: 'step', next: [{ to: 'result' }] },
          { id: 'result', label: 'Report run status', kind: 'step', next: [{ to: 'failure' }] },
          { id: 'failure', label: 'Real failure?', kind: 'decision', next: [{ to: 'alert', label: 'Yes' }, { to: 'done', label: 'No' }] },
          { id: 'alert', label: 'Alert me', kind: 'step', next: [{ to: 'done' }] },
          { id: 'done', label: 'Run logged', kind: 'end' },
        ],
      },
    ],
    scenarios: [
      {
        name: 'Published',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'grounded source found' },
          { node: 'script', log: 'LLM returned structured output' },
          { node: 'valid', log: 'schema ok, matches the source' },
          { node: 'tts', log: 'assets prepared' },
          { node: 'render', log: 'final output produced' },
          { node: 'dup', log: 'not published before' },
          { node: 'upload', log: 'scheduled for the next free slot' },
          { node: 'uploaded', log: 'publish confirmed' },
          { node: 'result', log: 'status: published' },
          { node: 'failure', log: 'no' },
          { node: 'done', log: 'run logged' },
        ],
      },
      {
        name: 'Model fallback',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'grounded source found' },
          { node: 'script', log: 'first model returned output' },
          { node: 'valid', log: 'adds claims that are not in the source' },
          { node: 'fallback', log: 'trying the next model' },
          { node: 'valid', log: 'schema ok, matches the source' },
          { node: 'tts', log: 'assets prepared' },
          { node: 'render', log: 'final output produced' },
          { node: 'dup', log: 'not published before' },
          { node: 'upload', log: 'scheduled for the next free slot' },
          { node: 'uploaded', log: 'publish confirmed' },
          { node: 'result', log: 'status: published' },
          { node: 'failure', log: 'no' },
          { node: 'done', log: 'run logged' },
        ],
      },
      {
        name: 'Duplicate',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'grounded source found' },
          { node: 'script', log: 'LLM returned output' },
          { node: 'valid', log: 'schema ok, matches the source' },
          { node: 'tts', log: 'assets prepared' },
          { node: 'render', log: 'final output produced' },
          { node: 'dup', log: 'same title already published' },
          { node: 'skip', log: 'skipped as duplicate, nothing published' },
          { node: 'result', log: 'status: skipped_duplicate' },
          { node: 'failure', log: 'a skip is not a failure' },
          { node: 'done', log: 'run logged' },
        ],
      },
      {
        name: 'No grounded source',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'no grounded source for today' },
          { node: 'skip', log: 'slot skipped instead of publishing an ungrounded content' },
          { node: 'result', log: 'status: skipped' },
          { node: 'failure', log: 'a skip is not a failure' },
          { node: 'done', log: 'run logged' },
        ],
      },
      {
        name: 'Publish fails',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'grounded source found' },
          { node: 'script', log: 'LLM returned output' },
          { node: 'valid', log: 'schema ok, matches the source' },
          { node: 'tts', log: 'assets prepared' },
          { node: 'render', log: 'final output produced' },
          { node: 'dup', log: 'not published before' },
          { node: 'upload', log: 'connection reset during publish' },
          { node: 'uploaded', log: 'publish failed' },
          { node: 'queue', log: 'queued, retried automatically' },
          { node: 'result', log: 'status: failed' },
          { node: 'failure', log: 'yes' },
          { node: 'alert', log: 'alert: publish failed, queued for retry' },
          { node: 'done', log: 'run logged as failed' },
        ],
      },
    ],
  },
]
