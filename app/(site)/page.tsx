import Introduction from '@/components/introduction'
import LegacyHashRedirect from '@/components/legacy-hash-redirect'

export default function Home() {
  return (
    <>
      <LegacyHashRedirect />
      <Introduction />
    </>
  )
}
