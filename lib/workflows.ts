// Workflow diagrams as data. components/health-diagram.tsx lays these out and
// replays each scenario step by step. Architecture illustrations, not live
// service status.

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
    id: 'vm-health',
    title: 'VM health monitoring & failover',
    summary: 'Monitor → diagnose → recover → record',
    stages: [
      {
        title: '01 / Monitor',
        nodes: [
          { id: 'cron', label: 'Cron trigger', kind: 'trigger', next: [{ to: 'checks' }] },
          { id: 'checks', label: 'Service checks', kind: 'step', next: [{ to: 'healthy' }] },
          { id: 'healthy', label: 'Healthy?', kind: 'decision', next: [{ to: 'health-log', label: 'Yes' }, { to: 'diagnostics', label: 'No' }] },
          { id: 'health-log', label: 'Health log', kind: 'end' },
        ],
      },
      {
        title: '02 / Diagnose & recover',
        nodes: [
          { id: 'diagnostics', label: 'Diagnostics', kind: 'step', next: [{ to: 'recoverable' }] },
          { id: 'recoverable', label: 'Recoverable?', kind: 'decision', next: [{ to: 'attempts', label: 'Yes' }, { to: 'escalation', label: 'No' }] },
          { id: 'attempts', label: 'Attempts remaining? (max 3)', kind: 'decision', next: [{ to: 'restart', label: 'Yes' }, { to: 'escalation', label: 'No, exhausted' }] },
          { id: 'restart', label: 'Restart service + count attempt', kind: 'step', next: [{ to: 'verification' }] },
          { id: 'verification', label: 'Verification', kind: 'step', next: [{ to: 'recovered' }] },
          { id: 'recovered', label: 'Recovered?', kind: 'decision', next: [{ to: 'success', label: 'Yes' }, { to: 'attempts', label: 'No' }] },
        ],
      },
      {
        title: '03 / Resolve & record',
        nodes: [
          { id: 'success', label: 'Recovery success', kind: 'step', next: [{ to: 'notification' }] },
          { id: 'escalation', label: 'Escalation', kind: 'step', next: [{ to: 'failover' }] },
          { id: 'failover', label: 'Failover / manual intervention', kind: 'step', next: [{ to: 'notification' }] },
          { id: 'notification', label: 'Notification', kind: 'step', next: [{ to: 'incident-log' }] },
          { id: 'incident-log', label: 'Incident log', kind: 'end' },
        ],
      },
    ],
    scenarios: [
      {
        name: 'All healthy',
        steps: [
          { node: 'cron', log: 'cron fired: */5 * * * *' },
          { node: 'checks', log: 'checking n8n, docker, disk, memory' },
          { node: 'healthy', log: 'all checks passed' },
          { node: 'health-log', log: 'wrote health snapshot, done' },
        ],
      },
      {
        name: 'Recovers on retry',
        steps: [
          { node: 'cron', log: 'cron fired: */5 * * * *' },
          { node: 'checks', log: 'checking n8n, docker, disk, memory' },
          { node: 'healthy', log: 'n8n not responding on :5678' },
          { node: 'diagnostics', log: 'container exited (137), likely OOM' },
          { node: 'recoverable', log: 'restartable service, attempting recovery' },
          { node: 'attempts', log: 'attempt 1 of 3' },
          { node: 'restart', log: 'docker restart n8n' },
          { node: 'verification', log: 'probing /healthz' },
          { node: 'recovered', log: 'still failing' },
          { node: 'attempts', log: 'attempt 2 of 3' },
          { node: 'restart', log: 'docker restart n8n' },
          { node: 'verification', log: 'probing /healthz' },
          { node: 'recovered', log: '200 OK' },
          { node: 'success', log: 'recovered after 2 attempts' },
          { node: 'notification', log: 'telegram: n8n recovered (2 attempts)' },
          { node: 'incident-log', log: 'incident closed' },
        ],
      },
      {
        name: 'Retries exhausted',
        steps: [
          { node: 'cron', log: 'cron fired: */5 * * * *' },
          { node: 'checks', log: 'checking n8n, docker, disk, memory' },
          { node: 'healthy', log: 'n8n not responding on :5678' },
          { node: 'diagnostics', log: 'container restarting in a loop' },
          { node: 'recoverable', log: 'restartable service, attempting recovery' },
          { node: 'attempts', log: 'attempt 1 of 3' },
          { node: 'restart', log: 'docker restart n8n' },
          { node: 'verification', log: 'probing /healthz' },
          { node: 'recovered', log: 'still failing' },
          { node: 'attempts', log: 'attempt 2 of 3' },
          { node: 'restart', log: 'docker restart n8n' },
          { node: 'verification', log: 'probing /healthz' },
          { node: 'recovered', log: 'still failing' },
          { node: 'attempts', log: 'attempt 3 of 3' },
          { node: 'restart', log: 'docker restart n8n' },
          { node: 'verification', log: 'probing /healthz' },
          { node: 'recovered', log: 'still failing' },
          { node: 'attempts', log: 'no attempts left' },
          { node: 'escalation', log: 'escalating with diagnostics attached' },
          { node: 'failover', log: 'manual intervention requested' },
          { node: 'notification', log: 'telegram: n8n down, action needed' },
          { node: 'incident-log', log: 'incident recorded as open' },
        ],
      },
      {
        name: 'Not recoverable',
        steps: [
          { node: 'cron', log: 'cron fired: */5 * * * *' },
          { node: 'checks', log: 'checking n8n, docker, disk, memory' },
          { node: 'healthy', log: 'disk usage at 98%' },
          { node: 'diagnostics', log: 'volume full, a restart will not help' },
          { node: 'recoverable', log: 'not recoverable automatically' },
          { node: 'escalation', log: 'escalating with diagnostics attached' },
          { node: 'failover', log: 'manual intervention requested' },
          { node: 'notification', log: 'telegram: disk full, action needed' },
          { node: 'incident-log', log: 'incident recorded as open' },
        ],
      },
    ],
  },
  {
    id: 'ai-orchestration',
    title: 'AI workflow orchestration',
    summary: 'Trigger → collect → validate → execute → notify',
    stages: [
      {
        title: '01 / Trigger',
        nodes: [
          { id: 'trigger', label: 'Schedule or webhook', kind: 'trigger', next: [{ to: 'n8n' }] },
          { id: 'n8n', label: 'n8n', kind: 'step', next: [{ to: 'collect' }] },
          { id: 'collect', label: 'Collect input', kind: 'step', next: [{ to: 'agent' }] },
        ],
      },
      {
        title: '02 / Generate & validate',
        nodes: [
          { id: 'agent', label: 'AI agent', kind: 'step', next: [{ to: 'validation' }] },
          { id: 'validation', label: 'Validation passed?', kind: 'decision', next: [{ to: 'action', label: 'Pass' }, { to: 'retry-available', label: 'Fail' }] },
          { id: 'retry-available', label: 'Retry available?', kind: 'decision', next: [{ to: 'retry', label: 'Yes' }, { to: 'error-alert', label: 'No' }] },
          { id: 'retry', label: 'Retry', kind: 'step', next: [{ to: 'collect' }] },
          { id: 'error-alert', label: 'Error alert', kind: 'step', next: [{ to: 'execution-log' }] },
        ],
      },
      {
        title: '03 / Execute & notify',
        nodes: [
          { id: 'action', label: 'API / database action', kind: 'step', next: [{ to: 'output' }] },
          { id: 'output', label: 'Output', kind: 'step', next: [{ to: 'notify' }] },
          { id: 'notify', label: 'Notification', kind: 'step', next: [{ to: 'execution-log' }] },
          { id: 'execution-log', label: 'Execution log', kind: 'end' },
        ],
      },
    ],
    scenarios: [
      {
        name: 'Happy path',
        steps: [
          { node: 'trigger', log: 'webhook received' },
          { node: 'n8n', log: 'workflow started' },
          { node: 'collect', log: 'collected 12 approved inputs' },
          { node: 'agent', log: 'agent returned a structured plan' },
          { node: 'validation', log: 'schema valid' },
          { node: 'action', log: 'wrote records via API' },
          { node: 'output', log: 'output packaged' },
          { node: 'notify', log: 'telegram: run succeeded' },
          { node: 'execution-log', log: 'run logged' },
        ],
      },
      {
        name: 'Retry then pass',
        steps: [
          { node: 'trigger', log: 'schedule fired' },
          { node: 'n8n', log: 'workflow started' },
          { node: 'collect', log: 'collected 12 approved inputs' },
          { node: 'agent', log: 'agent returned a plan' },
          { node: 'validation', log: 'missing required field "title"' },
          { node: 'retry-available', log: 'retry 1 of 2 available' },
          { node: 'retry', log: 're-running with validation feedback' },
          { node: 'collect', log: 'inputs reused' },
          { node: 'agent', log: 'agent returned a corrected plan' },
          { node: 'validation', log: 'schema valid' },
          { node: 'action', log: 'wrote records via API' },
          { node: 'output', log: 'output packaged' },
          { node: 'notify', log: 'telegram: run succeeded after retry' },
          { node: 'execution-log', log: 'run logged' },
        ],
      },
      {
        name: 'Validation keeps failing',
        steps: [
          { node: 'trigger', log: 'schedule fired' },
          { node: 'n8n', log: 'workflow started' },
          { node: 'collect', log: 'collected 12 approved inputs' },
          { node: 'agent', log: 'agent returned a plan' },
          { node: 'validation', log: 'invalid JSON' },
          { node: 'retry-available', log: 'retry 1 of 1 available' },
          { node: 'retry', log: 're-running with validation feedback' },
          { node: 'collect', log: 'inputs reused' },
          { node: 'agent', log: 'agent returned a plan' },
          { node: 'validation', log: 'invalid JSON' },
          { node: 'retry-available', log: 'no retries left' },
          { node: 'error-alert', log: 'telegram: validation failed twice' },
          { node: 'execution-log', log: 'run logged as failed' },
        ],
      },
    ],
  },
]
