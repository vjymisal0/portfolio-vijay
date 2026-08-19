import Projects from '@/components/projects'
import Education from '@/components/education'

export default function ProjectsSection() {
  return (
    <section>
      <div className="container mx-auto max-w-4xl space-y-16 py-10">
        <Projects />
        <Education />
      </div>
    </section>
  )
}
