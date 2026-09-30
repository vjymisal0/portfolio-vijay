'use client'

import { Bot, Clock3, Server, Webhook, Activity, Send } from 'lucide-react'
import { CircuitBoard, type CircuitConnection, type CircuitNodeType } from '@/components/ui/circuit-board'

const nodes: CircuitNodeType[] = [
  { id: 'cron', x: 90, y: 60, label: 'Cron', icon: <Clock3 className="h-4 w-4" />, status: 'active' },
  { id: 'webhook', x: 90, y: 200, label: 'Webhooks', icon: <Webhook className="h-4 w-4" />, status: 'active' },
  { id: 'vm', x: 360, y: 130, label: 'Self-hosted VM · n8n', icon: <Server className="h-5 w-5" />, status: 'processing', size: 'lg' },
  { id: 'agent', x: 630, y: 60, label: 'AI agent', icon: <Bot className="h-4 w-4" />, status: 'active' },
  { id: 'health', x: 630, y: 200, label: 'Health check', icon: <Activity className="h-4 w-4" />, status: 'active' },
  { id: 'alert', x: 360, y: 250, label: 'Telegram alert', icon: <Send className="h-3.5 w-3.5" />, status: 'inactive', size: 'sm' },
]

const connections: CircuitConnection[] = [
  { from: 'cron', to: 'vm', animated: true },
  { from: 'webhook', to: 'vm', animated: true },
  { from: 'vm', to: 'agent', animated: true },
  { from: 'vm', to: 'health', animated: true, bidirectional: true },
  { from: 'health', to: 'alert', animated: true },
]

export default function SystemMap() {
  return (
    <figure className="mb-8 overflow-x-auto rounded-2xl border border-border bg-card" aria-label="Map of the self-hosted automation stack">
      <CircuitBoard nodes={nodes} connections={connections} width={720} height={290} className="mx-auto" />
    </figure>
  )
}
