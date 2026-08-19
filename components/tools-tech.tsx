'use client'

import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiNestjs, SiTypescript, SiMongodb, SiPostgresql, SiFirebase, SiDocker, SiGooglecloud, SiGit } from 'react-icons/si'

const techCategories = [
  {
    title: 'Frontend',
    tools: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    title: 'Backend',
    tools: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Firebase', icon: SiFirebase },
    ]
  },
  {
    title: 'DevOps & Tools',
    tools: [
      { name: 'Docker', icon: SiDocker },
      { name: 'Google Cloud', icon: SiGooglecloud },
      { name: 'Git', icon: SiGit },
    ]
  }
]

export default function ToolsAndTech() {
  return (
    <section className="container mx-auto px-6 lg:px-12 max-w-4xl">
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-12">Tools & Technology</h2>
      
      <div className="flex flex-col border-t border-border">
        {techCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col md:flex-row gap-6 py-8 border-b border-border transition-colors hover:bg-foreground/5">
            <div className="w-full md:w-1/3">
              <h3 className="font-serif text-xl font-medium text-foreground">{cat.title}</h3>
            </div>
            
            <div className="w-full md:w-2/3 flex flex-wrap gap-x-6 gap-y-4">
              {cat.tools.map((tool) => (
                <div key={tool.name} className="flex items-center gap-2.5 text-muted-foreground">
                  <tool.icon className="w-4 h-4 text-foreground/60" />
                  <span className="text-sm font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
