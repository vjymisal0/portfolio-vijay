import ProjectsSection from '@/components/work'
import Automation from '@/components/automation'

export default function BuildSystems() {
  return (
    <section>
      <div className="space-y-24">
        <Automation />
        <ProjectsSection />
      </div>
    </section>
  )
}
