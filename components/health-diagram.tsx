'use client'

import { useEffect, useRef, useState } from 'react'
import shapes from '@/lib/health-diagram-shapes.json'
import labels from '@/lib/health-diagram-labels.json'

type Shape = { tag: string; attrs: Record<string, string | undefined>; children: Shape[] }
const panels = [
  { title: 'VM health monitoring & failover', description: 'Monitor → diagnose → recover → record', x: 0, width: 1220, height: 1435 },
  { title: 'AI workflow orchestration', description: 'Trigger → collect → validate → execute → notify', x: 1250, width: 570, height: 1320 },
]

// Original geometry rendered with Canvas 2D; no SVG elements or image assets.
function draw(ctx: CanvasRenderingContext2D, shape: Shape, colors: Record<string, string>, inheritedFill = 'none', inheritedStroke = 'none') {
  const a = shape.attrs
  const fill = a.fill ?? inheritedFill
  const stroke = a.stroke ?? inheritedStroke
  ctx.save()
  for (const match of (a.transform || '').matchAll(/(translate|rotate|scale)\(([^)]+)\)/g)) {
    const n = match[2].trim().split(/[ ,]+/).map(Number)
    if (match[1] === 'translate') ctx.translate(n[0], n[1] || 0)
    if (match[1] === 'scale') ctx.scale(n[0], n[1] ?? n[0])
    if (match[1] === 'rotate') {
      ctx.translate(n[1] || 0, n[2] || 0)
      ctx.rotate(n[0] * Math.PI / 180)
      ctx.translate(-(n[1] || 0), -(n[2] || 0))
    }
  }
  if (shape.tag === 'svg' && a.viewBox && Number(a.width) < 100) {
    const box = a.viewBox.split(' ').map(Number)
    ctx.scale(Number(a.width) / box[2], Number(a.height) / box[3])
  }
  if (a.fill && a.fill !== 'none') ctx.fillStyle = colors[a.fill] || a.fill
  if (a.stroke && a.stroke !== 'none') ctx.strokeStyle = colors[a.stroke] || a.stroke
  if (a['stroke-width']) ctx.lineWidth = Number(a['stroke-width'])
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const p = new Path2D(shape.tag === 'path' ? a.d : undefined)
  const n = (key: string) => Number(a[key] || 0)
  if (shape.tag === 'rect') p.roundRect(n('x'), n('y'), n('width'), n('height'), n('rx'))
  if (shape.tag === 'circle') p.arc(n('cx'), n('cy'), n('r'), 0, Math.PI * 2)
  if (shape.tag === 'ellipse') p.ellipse(n('cx'), n('cy'), n('rx'), n('ry'), 0, 0, Math.PI * 2)
  if (shape.tag === 'line') { p.moveTo(n('x1'), n('y1')); p.lineTo(n('x2'), n('y2')) }
  if (shape.tag === 'polyline') {
    const points = (a.points || '').trim().split(/[ ,]+/).map(Number)
    for (let i = 0; i < points.length; i += 2) {
      if (i === 0) p.moveTo(points[i], points[i + 1]); else p.lineTo(points[i], points[i + 1])
    }
  }
  if (fill !== 'none') ctx.fill(p)
  if (stroke !== 'none') ctx.stroke(p)
  for (const child of shape.children) draw(ctx, child, colors, fill, stroke)
  ctx.restore()
}

function DiagramPanel({ panel }: { panel: typeof panels[number] }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState(0.65)
  const [zoom, setZoom] = useState(1)
  const scale = fit * zoom
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setFit(Math.min(1, Math.max(0.65, (entry.contentRect.width - 32) / panel.width)))
    })
    observer.observe(viewport.current!)
    return () => observer.disconnect()
  }, [panel.width])
  useEffect(() => {
    const el = canvas.current!
    const render = () => {
      const style = getComputedStyle(el)
      const color = (name: string) => `hsl(${style.getPropertyValue(name).trim()})`
      const ctx = el.getContext('2d')!
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      el.width = panel.width * ratio; el.height = panel.height * ratio
      ctx.scale(ratio, ratio)
      ctx.translate(-panel.x, 0)
      const palette = {
        '#171717': color('--background'), '#282c30': color('--card'),
        '#252c32': color('--secondary'), '#313943': color('--secondary'),
        '#332521': color('--secondary'), '#433b2f': color('--secondary'),
        '#2e69c6': color('--secondary'), '#9b3929': color('--muted'),
        '#e2e2e2': color('--foreground'), '#ffffff': color('--foreground'),
        '#b1c8e1': color('--border'), '#ddddff': color('--primary'),
        '#35312a': color('--border'),
      }
      draw(ctx, shapes, palette)
    }
    render()
    const observer = new MutationObserver(render)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] })
    return () => observer.disconnect()
  }, [panel])

  return (
    <figure className="mb-8 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <figcaption className="text-sm font-semibold">{panel.title}</figcaption>
          <p className="mt-1 text-[11px] text-muted-foreground">{panel.description}</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button type="button" aria-label={`Zoom out ${panel.title}`} disabled={zoom <= 0.4} onClick={() => setZoom(z => Math.max(0.4, z - 0.15))} className="rounded border px-3 py-2 disabled:opacity-40">−</button>
          <span className="w-10 text-center">{Math.round(scale * 100)}%</span>
          <button type="button" aria-label={`Zoom in ${panel.title}`} disabled={zoom >= 1.4} onClick={() => setZoom(z => Math.min(1.4, z + 0.15))} className="rounded border px-3 py-2 disabled:opacity-40">+</button>
        </div>
      </div>
      <div ref={viewport} tabIndex={0} role="region" aria-label={`Scrollable ${panel.title}`} className="max-h-[70vh] overflow-auto overscroll-contain bg-background p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" data-lenis-prevent>
        <div style={{ width: panel.width * scale, height: panel.height * scale }}>
          <div className="relative origin-top-left" style={{ width: panel.width, height: panel.height, transform: `scale(${scale})` }}>
            <canvas ref={canvas} aria-hidden="true" style={{ width: panel.width, height: panel.height }} />
            {labels.filter(label => label.x >= panel.x && label.x < panel.x + panel.width).map((label, i) => (
              <span key={i} className="absolute flex items-center justify-center whitespace-pre-line text-center font-sans text-foreground" style={{ left: label.x - panel.x, top: label.y, width: label.width, minHeight: label.height, fontSize: 14, lineHeight: '18px', background: label.branch ? 'hsl(var(--background))' : undefined }}>
                {label.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-border px-4 py-3 text-[11px] text-muted-foreground">Scroll or swipe to explore this workflow. Use + / − for detail. Architecture illustration, not live service status.</p>
    </figure>
  )
}

export default function HealthDiagram() {
  return <div className="min-w-0">{panels.map(panel => <DiagramPanel key={panel.title} panel={panel} />)}</div>
}
