import Clarity from '@/components/clarity'
import SiteShell from '@/components/site-shell'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteShell>{children}</SiteShell>
      <Clarity />
    </>
  )
}
