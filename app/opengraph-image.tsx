import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Vijay Misal - Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f3f8fc',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'monospace, sans-serif',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Top header badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f1ede4',
              borderRadius: '9999px',
              padding: '8px 18px',
              border: '1px solid #e2ded5',
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#1d4ed8',
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#1e293b',
                textTransform: 'uppercase',
              }}
            >
              Vijay Misal / Pune, India
            </span>
          </div>
        </div>

        {/* Main headline and role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h1
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: '#0f172a',
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
            }}
          >
            Software engineer,
            <br />
            <span style={{ color: '#1d4ed8' }}>building with AI.</span>
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#475569',
              margin: 0,
              maxWidth: '920px',
              lineHeight: 1.4,
            }}
          >
            SDE 1 at Loopr AI. Full-stack software, automated workflows, and production systems.
          </p>
        </div>

        {/* Bottom tags & footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '32px',
            borderTop: '1px solid #e7e2d9',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            {['React', 'TypeScript', 'NestJS', 'n8n', 'AI Agents'].map((tech) => (
              <span
                key={tech}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #dcd6cc',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#334155',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#1d4ed8',
              letterSpacing: '0.08em',
            }}
          >
            PORTFOLIO ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
