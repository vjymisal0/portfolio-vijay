import type { Metadata } from 'next'
import Experience from '@/components/experience'

const description =
  'Vijay Misal’s work at Loopr AI: training YOLO defect-detection models, extending the inference pipeline, and shipping full-stack features for an industrial visual-inspection platform. Plus education.'

export const metadata: Metadata = {
  title: 'Experience',
  description,
  alternates: { canonical: '/experience' },
  openGraph: { title: 'Experience | Vijay Misal', description, url: '/experience' },
}

export default function ExperiencePage() {
  return <Experience />
}
