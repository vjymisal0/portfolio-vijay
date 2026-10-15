'use client'

import { Bot, Clock3, Instagram, Send, Server, Youtube } from 'lucide-react'
import { CircuitBoard, type CircuitConnection, type CircuitNodeType } from '@/components/ui/circuit-board'

// Public page: keep this at the level of what flows where. No hosts,
// providers, schedules, or access paths.
const nodes: CircuitNodeType[] = [
  { id: 'scheduler', x: 90, y: 60, label: 'Scheduler (n8n)', icon: <Clock3 className="h-4 w-4" />, status: 'active' },
  { id: 'ai', x: 90, y: 200, label: 'AI models', icon: <Bot className="h-4 w-4" />, status: 'active' },
  { id: 'server', x: 360, y: 130, label: 'Automation server', icon: <Server className="h-5 w-5" />, status: 'processing', size: 'lg' },
  { id: 'youtube', x: 630, y: 50, label: 'YouTube Shorts', icon: <Youtube className="h-4 w-4" />, status: 'active' },
  { id: 'instagram', x: 630, y: 140, label: 'Instagram', icon: <Instagram className="h-4 w-4" />, status: 'active' },
  { id: 'alert', x: 630, y: 230, label: 'Alerts', icon: <Send className="h-4 w-4" />, status: 'inactive' },
]

const connections: CircuitConnection[] = [
  { from: 'scheduler', to: 'server', animated: true },
  { from: 'ai', to: 'server', animated: true, bidirectional: true },
  { from: 'server', to: 'youtube', animated: true },
  { from: 'server', to: 'instagram', animated: true },
  { from: 'server', to: 'alert', animated: true },
]

export default function SystemMap() {
  return (
    <figure className="mb-8 overflow-x-auto rounded-2xl border border-border bg-card" aria-label="Map of the automations: a scheduler and AI models feed an automation server that publishes to YouTube and Instagram and sends alerts">
      <CircuitBoard nodes={nodes} connections={connections} width={720} height={290} className="mx-auto" />
    </figure>
  )
}
