'use client'

import CaseStudy from '@/components/case-study'
import HealthDiagram from '@/components/health-diagram'
import SystemMap from '@/components/system-map'
import CollapsibleSection from '@/components/ui/collapsible-section'
import { StepPlayer } from '@/components/ui/step-player'

// Public page: describe what the automation does, never how the server is
// reached, scheduled, monitored, or secured. Keep it generic: no platform,
// channel, brand, language, or content-niche names.
const steps = [
  { label: 'Source', detail: 'Starts from real, reliable source material. If there is none that day, it skips instead of letting the AI make something up.' },
  { label: 'Generate', detail: 'An AI model drafts the content. A second check compares it with the source to catch errors. If one AI model fails, it switches to a backup automatically.' },
  { label: 'Produce', detail: 'Turns the approved draft into the finished piece, ready to publish.' },
  { label: 'Publish', detail: 'Never posts the same thing twice. If publishing fails, it saves the work and retries on its own.' },
  { label: 'Report', detail: 'Every run records what happened: published, skipped, or failed. I only get an alert for real problems, so there is no noise.' },
]

export default function Automation() {
  return (
    <CaseStudy
      category="AI automation"
      status="Running daily"
      title="Self-running AI publishing system"
      summary="A system that creates, checks, and publishes content every day on its own, and asks for help only when something really needs a human."
      problem="AI can write content in seconds, but it also makes things up and fails at random. Publishing daily by hand does not scale, and publishing AI output blindly is risky."
      built="A self-hosted pipeline that sources material, has AI draft from it, verifies the draft against the source, produces the final piece, and publishes it on a schedule."
      decision="Skip rather than guess. When there is no reliable source or the AI output does not hold up, the run publishes nothing. I chose this over always posting something, because one wrong post costs more than one missed day."
      result="Runs every day without manual work. Failures retry themselves, duplicates are blocked, and alerts fire only for real problems, so a quiet inbox means the system is healthy."
      technologies={['n8n', 'Python', 'LLMs', 'Docker']}
      details={
        <CollapsibleSection
          header={<h4 className="text-base font-medium text-foreground">See how it works</h4>}
          summary="The architecture, each step in plain words, and a replay of how a run handles a bad day."
        >
          <div className="space-y-8 pt-2">
            <SystemMap />
            <StepPlayer steps={steps} name="Self-running AI publishing system" />
            <div>
              <h5 className="text-base font-medium text-foreground">Watch it handle a bad day</h5>
              <p className="mb-4 mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Pick a scenario and press play: a normal day, an AI mistake caught, a duplicate avoided, a day with nothing reliable to post, and a failed publish that recovers.
              </p>
              <HealthDiagram />
            </div>
          </div>
        </CollapsibleSection>
      }
    />
  )
}
