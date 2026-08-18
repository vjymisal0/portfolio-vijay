import re

with open('components/open-source.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add useState to imports
if 'import { useState }' not in content:
    content = content.replace('import { useSmoothScroll }', "import { useState } from 'react'\nimport { useSmoothScroll }")

# Replace export default function OpenSource()
func_start = 'export default function OpenSource() {'
replacement = """export default function OpenSource() {
  const [showAllPRs, setShowAllPRs] = useState(false)
  const repoCount = new Set(contributions.map((c) => c.repo)).size
  const { wrapperRef, contentRef } = useSmoothScroll()

  const visibleContributions = showAllPRs ? contributions : contributions.slice(0, 6)
"""
content = content.replace('export default function OpenSource() {\n  const repoCount = new Set(contributions.map((c) => c.repo)).size\n  const { wrapperRef, contentRef } = useSmoothScroll()', replacement)

# Replace contributions.map with visibleContributions.map
content = content.replace('              {contributions.map((c) => {', '              {visibleContributions.map((c) => {')

# Add the show more button and CTA at the bottom of the section
bottom_content = """            </motion.div>
            
            {contributions.length > 6 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllPRs(!showAllPRs)}
                  className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer border border-border/50 bg-card/20 hover:bg-card/40 px-4 py-2 rounded-full"
                >
                  {showAllPRs ? 'Show less' : `Show all ${contributions.length} contributions`}
                </button>
              </div>
            )}
          </div>

          {/* Published packages */}"""
content = content.replace('            </motion.div>\n          </div>\n\n          {/* Published packages */}', bottom_content)

# Add the Contact / Connect CTA at the bottom
cta_html = """
          {/* Let's Connect CTA */}
          <div className="pt-12 mt-12 border-t border-border/30">
            <div className="relative rounded-2xl border border-border bg-card/20 p-8 sm:p-10 text-center overflow-hidden group/cta">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Let's Connect!</h2>
              <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                I'm always open to discussing new projects, open-source collaborations, or creative ideas.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <a href="mailto:vijaymisal0@gmail.com" className="inline-flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-full transition-colors relative z-10">
                  <FileText className="w-4 h-4" /> Send an Email
                </a>
                <a href="https://linkedin.com/in/vijaymisal0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-5 py-2.5 rounded-full transition-colors relative z-10">
                   LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}"""

content = re.sub(r'          </div>\n        </div>\n      </div>\n    </section>\n  \)\n}', cta_html, content)

with open('components/open-source.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("success")
