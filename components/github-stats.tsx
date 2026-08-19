'use client'

import GitHubCalendar from 'react-github-calendar'

export default function GitHubStats() {
  return (
    <section className="container mx-auto px-6 lg:px-12 max-w-4xl py-24">
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-12">GitHub Contributions</h2>

      <div className="flex flex-col border-t border-border pt-12">
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="min-w-[800px] flex justify-center">
            <GitHubCalendar
              username="vjymisal0"
              colorScheme="light" // the minimalist monochrome theme is generally high contrast
              theme={{
                light: ['#f0f0f0', '#dcdcdc', '#a0a0a0', '#505050', '#000000'],
                dark: ['#1a1a1a', '#333333', '#666666', '#cccccc', '#ffffff'],
              }}
              blockMargin={4}
              blockSize={12}
              fontSize={12}
            />
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
          Consistency over time.
        </p>
      </div>
    </section>
  )
}
