import Projects from '@/components/projects'
import Automation from '@/components/automation'

export default function BuildSystems() {
  return (
    <section>
      <div className="space-y-24">
        <Automation />
        <div className="container mx-auto max-w-4xl px-6 py-10 lg:px-12">
          <Projects />
        </div>
      </div>
    </section>
  )
}
