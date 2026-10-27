'use client'

import { Bot, Clock3, FileText, Send, Server, Share2 } from 'lucide-react'
import { CircuitBoard, type CircuitConnection, type CircuitNodeType } from '@/components/ui/circuit-board'

// Public page: keep this at the level of what flows where. No hosts,
// providers, schedules, access paths, or named publishing platforms.
const nodes: CircuitNodeType[] = [
  { id: 'scheduler', x: 90, y: 60, label: 'Scheduler (n8n)', icon: <Clock3 className="h-4 w-4" />, status: 'active' },
  { id: 'ai', x: 90, y: 200, label: 'AI models', icon: <Bot className="h-4 w-4" />, status: 'active' },
  { id: 'server', x: 360, y: 130, label: 'Automation server', icon: <Server className="h-5 w-5" />, status: 'processing', size: 'lg' },
  { id: 'targets', x: 630, y: 50, label: 'Publishing targets', icon: <Share2 className="h-4 w-4" />, status: 'active' },
  { id: 'reports', x: 630, y: 140, label: 'Run reports', icon: <FileText className="h-4 w-4" />, status: 'active' },
  { id: 'alert', x: 630, y: 230, label: 'Alerts', icon: <Send className="h-4 w-4" />, status: 'inactive' },
]

const connections: CircuitConnection[] = [
  { from: 'scheduler', to: 'server', animated: true },
  { from: 'ai', to: 'server', animated: true, bidirectional: true },
  { from: 'server', to: 'targets', animated: true },
  { from: 'server', to: 'reports', animated: true },
  { from: 'server', to: 'alert', animated: true },
]

export default function SystemMap() {
  return (
    <figure className="mb-8 overflow-x-auto rounded-2xl border border-border bg-card" aria-label="Map of the automations: a scheduler and AI models feed an automation server that publishes content, logs run reports, and sends alerts">
      <CircuitBoard nodes={nodes} connections={connections} width={720} height={290} className="mx-auto" />
    </figure>
  )
}
