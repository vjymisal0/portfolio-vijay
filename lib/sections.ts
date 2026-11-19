// The site's top-level pages, in navigation order. `id` doubles as the legacy
// hash (`/#builds`), which the home page still redirects to the real route.
export const sections = [
  { id: 'home', href: '/', label: 'Home', short: 'Home' },
  { id: 'experience', href: '/experience', label: 'Experience', short: 'Exp' },
  { id: 'builds', href: '/builds', label: 'Build Systems', short: 'Builds' },
  { id: 'oss', href: '/oss', label: 'Open Source', short: 'OSS' },
] as const

export type Section = (typeof sections)[number]

export function sectionForPath(pathname: string): Section {
  return sections.find((s) => s.href !== '/' && pathname.startsWith(s.href)) ?? sections[0]
}
