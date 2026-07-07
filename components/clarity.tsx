'use client'

import Script from 'next/script'

/**
 * Microsoft Clarity — heatmaps + session recordings.
 * Set NEXT_PUBLIC_CLARITY_ID in .env.local (grab the project ID from
 * https://clarity.microsoft.com after creating a project). When the env var
 * is absent (e.g. local dev), this renders nothing so it never blocks the app.
 */
export default function Clarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_ID

  if (!projectId) return null

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");`}
    </Script>
  )
}
