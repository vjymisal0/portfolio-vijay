import Projects from '@/components/projects'
import Education from '@/components/education'

export default function ProjectsSection() {
  return (
    <section>
      <div className="container mx-auto max-w-4xl space-y-16 px-6 py-10 lg:px-12">
        <Projects />
        <Education />
      </div>
    </section>
  )
}
