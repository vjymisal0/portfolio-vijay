import re

with open('components/projects.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add useMemo to imports
if 'import { useMemo }' not in content:
    content = content.replace('import { useState } from "react"', 'import { useState, useMemo } from "react"')

# Add Tech Filter Logic inside export default function Projects()
func_start = 'export default function Projects() {'
replacement = """export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const allTechs = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach(p => p.technologies.forEach(t => techs.add(t)))
    return Array.from(techs).sort()
  }, [])

  const filteredProjects = selectedTech 
    ? projects.filter(p => p.technologies.includes(selectedTech))
    : projects
"""
content = content.replace('export default function Projects() {\n  const [selected, setSelected] = useState<Project | null>(null)\n  const [galleryOpen, setGalleryOpen] = useState(false)', replacement)

# Replace projects.map with filteredProjects.map
content = content.replace('{projects.map((project, idx) => {', '{filteredProjects.map((project, idx) => {')

# Add the Filter UI above the motion.div grid
filter_ui = """
        {/* Tech Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTech(null)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${
              selectedTech === null 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-card/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
            }`}
          >
            All
          </button>
          {allTechs.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${
                selectedTech === tech 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-card/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <motion.div"""
content = content.replace('        <motion.div\n          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"', filter_ui + '\n          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"')

with open('components/projects.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("success")
