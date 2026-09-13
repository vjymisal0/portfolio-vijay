// Run against npm run dev: node scripts/check-health-diagram.cjs
const assert = require('node:assert/strict')
const { chromium } = require('playwright')
;(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' })
  try {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('http://localhost:3000/#builds')
      const diagram = page.getByRole('region', { name: /^Scrollable / })
      await diagram.first().waitFor()
      assert.equal(await diagram.count(), 2)
      assert.equal(await diagram.locator('svg, object, img').count(), 0)
      assert.equal(await diagram.locator('canvas').count(), 2)
      for (const label of ['Diagnostics', 'Recoverable?', 'Verification', 'Recovered?', 'Error alert', 'Incident log']) {
        assert.equal(await diagram.getByText(label, { exact: true }).count(), 1, label)
      }
      const before = await diagram.first().locator('canvas').evaluate(el => el.getBoundingClientRect().width)
      await page.getByRole('button', { name: 'Zoom in VM health monitoring & failover', exact: true }).click()
      const after = await diagram.first().locator('canvas').evaluate(el => el.getBoundingClientRect().width)
      assert(after > before)
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    }
    assert.deepEqual(errors, [])
    console.log('PASS: desktop/mobile, original labels, canvas-only rendering, zoom, no page overflow or runtime errors')
  } finally { await browser.close() }
})().catch(e => { console.error(e); process.exitCode = 1 })
