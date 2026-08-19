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
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1
            style={{
              fontSize: 100,
              fontFamily: 'serif',
              fontWeight: 500,
              color: 'white',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Vijay Misal
          </h1>
          <p
            style={{
              fontSize: 40,
              color: '#a1a1aa',
              margin: 0,
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            SDE 1 at Loopr AI. Building reliable, well-crafted software.
          </p>
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', color: 'white', fontSize: 24, fontWeight: 'bold', letterSpacing: '0.1em' }}>
            PORTFOLIO
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
