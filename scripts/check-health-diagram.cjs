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
      const vm = page.locator('figure', { has: page.getByText('VM health monitoring & failover', { exact: true }) })
      await vm.waitFor()
      assert.equal(await page.locator('figure canvas').count(), 0)
      for (const label of ['Diagnostics', 'Recoverable?', 'Verification', 'Recovered?', 'Incident log']) {
        assert(await vm.locator(`[data-node]`, { hasText: label }).count() >= 1, label)
      }
      await vm.getByRole('button', { name: 'Recovers on retry' }).click()
      await vm.locator('[data-node="incident-log"][data-state="active"]').waitFor({ timeout: 20000 })
      assert.equal(await vm.locator('[data-node="escalation"][data-state="visited"]').count(), 0)
      assert.equal(await vm.getByRole('list', { name: /run log/ }).locator('li').count(), 16)
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    }
    assert.deepEqual(errors, [])
    console.log('PASS: desktop/mobile, labels, scenario replay reaches the end state, no page overflow or runtime errors')
  } finally { await browser.close() }
})().catch(e => { console.error(e); process.exitCode = 1 })
