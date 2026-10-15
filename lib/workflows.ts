// Workflow diagrams as data. components/health-diagram.tsx lays these out and
// replays each scenario step by step. The branches mirror the production
// pipeline; the runs themselves are simulated, not live service status.
// Keep this public-safe: no hosts, schedules, file names, or credentials.

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
    id: 'shorts-publish',
    title: 'Shorts publish run',
    summary: 'Topic → AI script → narration → render → upload → report',
    stages: [
      {
        title: '01 / Pick & write',
        nodes: [
          { id: 'trigger', label: 'Scheduled run', kind: 'trigger', next: [{ to: 'topic' }] },
          { id: 'topic', label: 'Grounded topic for today?', kind: 'decision', next: [{ to: 'script', label: 'Yes' }, { to: 'skip', label: 'No' }] },
          { id: 'script', label: 'LLM writes script (JSON)', kind: 'step', next: [{ to: 'valid' }] },
          { id: 'valid', label: 'Valid and faithful to source?', kind: 'decision', next: [{ to: 'tts', label: 'Yes' }, { to: 'fallback', label: 'No' }] },
          { id: 'fallback', label: 'Next model, then story corpus', kind: 'step', next: [{ to: 'valid' }] },
        ],
      },
      {
        title: '02 / Produce & upload',
        nodes: [
          { id: 'tts', label: 'Local Hindi narration', kind: 'step', next: [{ to: 'render' }] },
          { id: 'render', label: 'Render video, captions, thumbnail', kind: 'step', next: [{ to: 'dup' }] },
          { id: 'dup', label: 'Topic already uploaded?', kind: 'decision', next: [{ to: 'skip', label: 'Yes' }, { to: 'upload', label: 'No' }] },
          { id: 'upload', label: 'Upload into next free publish slot', kind: 'step', next: [{ to: 'uploaded' }] },
          { id: 'uploaded', label: 'Upload OK?', kind: 'decision', next: [{ to: 'result', label: 'Yes' }, { to: 'queue', label: 'No' }] },
        ],
      },
      {
        title: '03 / Report',
        nodes: [
          { id: 'skip', label: 'Skip slot, nothing published', kind: 'step', next: [{ to: 'result' }] },
          { id: 'queue', label: 'Queue upload for retry', kind: 'step', next: [{ to: 'result' }] },
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
          { node: 'topic', log: 'grounded topic picked for today\'s deity' },
          { node: 'script', log: 'LLM returned title, script, hashtags' },
          { node: 'valid', log: 'schema ok, matches the source story' },
          { node: 'tts', log: 'narration synthesized locally' },
          { node: 'render', log: 'video, captions, thumbnail rendered' },
          { node: 'dup', log: 'topic not published before' },
          { node: 'upload', log: 'scheduled for the next free slot' },
          { node: 'uploaded', log: 'video id returned' },
          { node: 'result', log: 'status: uploaded' },
          { node: 'failure', log: 'no' },
          { node: 'done', log: 'run logged' },
        ],
      },
      {
        name: 'Model fallback',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'grounded topic picked' },
          { node: 'script', log: 'first model returned a script' },
          { node: 'valid', log: 'adds events that are not in the source story' },
          { node: 'fallback', log: 'trying the next model' },
          { node: 'valid', log: 'schema ok, matches the source story' },
          { node: 'tts', log: 'narration synthesized locally' },
          { node: 'render', log: 'video, captions, thumbnail rendered' },
          { node: 'dup', log: 'topic not published before' },
          { node: 'upload', log: 'scheduled for the next free slot' },
          { node: 'uploaded', log: 'video id returned' },
          { node: 'result', log: 'status: uploaded' },
          { node: 'failure', log: 'no' },
          { node: 'done', log: 'run logged' },
        ],
      },
      {
        name: 'Duplicate topic',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'grounded topic picked' },
          { node: 'script', log: 'LLM returned a script' },
          { node: 'valid', log: 'schema ok, matches the source story' },
          { node: 'tts', log: 'narration synthesized locally' },
          { node: 'render', log: 'video, captions, thumbnail rendered' },
          { node: 'dup', log: 'same title already on the channel' },
          { node: 'skip', log: 'skipped as duplicate, nothing uploaded' },
          { node: 'result', log: 'status: skipped_duplicate' },
          { node: 'failure', log: 'a skip is not a failure' },
          { node: 'done', log: 'run logged' },
        ],
      },
      {
        name: 'No grounded topic',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'no topic with a source story for today' },
          { node: 'skip', log: 'slot skipped instead of publishing an ungrounded script' },
          { node: 'result', log: 'status: skipped' },
          { node: 'failure', log: 'a skip is not a failure' },
          { node: 'done', log: 'run logged' },
        ],
      },
      {
        name: 'Upload fails',
        steps: [
          { node: 'trigger', log: 'run started' },
          { node: 'topic', log: 'grounded topic picked' },
          { node: 'script', log: 'LLM returned a script' },
          { node: 'valid', log: 'schema ok, matches the source story' },
          { node: 'tts', log: 'narration synthesized locally' },
          { node: 'render', log: 'video, captions, thumbnail rendered' },
          { node: 'dup', log: 'topic not published before' },
          { node: 'upload', log: 'connection reset during upload' },
          { node: 'uploaded', log: 'upload failed' },
          { node: 'queue', log: 'video queued, retried automatically' },
          { node: 'result', log: 'status: failed' },
          { node: 'failure', log: 'yes' },
          { node: 'alert', log: 'alert: upload failed, video queued for retry' },
          { node: 'done', log: 'run logged as failed' },
        ],
      },
    ],
  },
]
