const assert = require('node:assert/strict')
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' })
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    const base = process.env.PORTFOLIO_URL || 'http://localhost:3000'
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(base)
      await page.getByRole('heading', { level: 1 }).waitFor()
      assert.match(await page.locator('h1').innerText(), /Software engineer,\s+building with AI\./)
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      assert.equal(await page.getByRole('region', { name: 'home content' }).evaluate(el => el.scrollWidth > el.clientWidth), false)
      await page.getByRole('link', { name: 'Explore my work', exact: true }).click()
      await page.getByRole('heading', { name: 'Automation & workflows' }).waitFor()
      assert.equal(await page.locator('nav[aria-label="Main navigation"] [aria-current="page"]').getAttribute('href'), '/#builds')
      await page.goBack()
      await page.getByRole('heading', { level: 1 }).waitFor()
      console.log(`PASS ${width}px: homepage, overflow, work CTA, active navigation, browser back`)
    }
    for (const [section, title] of [['experience', 'Experience'], ['builds', 'Automation & workflows'], ['oss', 'Open Source']]) {
      await page.goto(`${base}/#${section}`)
      const heading = page.getByRole('heading', { name: title, exact: true })
      await heading.waitFor()
      const style = await heading.evaluate(el => {
        const css = getComputedStyle(el)
        return { family: css.fontFamily, size: css.fontSize, weight: css.fontWeight }
      })
      assert.match(style.family, /Geist Mono|Geist_Mono/i)
      assert.equal(style.size, '36px')
      assert.equal(style.weight, '500')
    }
    console.log('PASS consistent section title typography')
    await page.goto(base)
    await page.getByRole('heading', { level: 1 }).waitFor()
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), 'solid')
    await page.screenshot({ path: process.env.TEMP + '/portfolio-home-desktop.png' })
    await page.setViewportSize({ width: 375, height: 900 })
    await page.screenshot({ path: process.env.TEMP + '/portfolio-home-mobile.png' })
    assert.deepEqual(errors, [])
    console.log('PASS direct links, clean homepage return, keyboard focus, no runtime errors; screenshots saved to TEMP')
  } finally {
    await browser.close()
  }
})().catch(error => { console.error(error); process.exitCode = 1 })
