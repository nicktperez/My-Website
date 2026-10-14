import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const routes = [
  { path: '/', title: 'Nicholas Perez | IT Systems Engineer' },
  { path: '/work', title: 'Nicholas Perez | IT Systems Engineer' },
]

test('home introduces Nick and links to about, work, and contact without screenshots', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Hi, I’m Nick.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'A little about me.' })).toBeVisible()
  await expect(page.locator('main video')).toHaveCount(0)
  const backdrop = page.locator('.signal-server-backdrop')
  await expect(backdrop).toHaveAttribute('alt', '')
  expect(await backdrop.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  await page.getByRole('link', { name: 'A little about me', exact: true }).click()
  await expect(page).toHaveURL(/#about$/)
  await expect(page.getByRole('link', { name: 'Explore MacTrace', exact: true })).toHaveAttribute('href', /github\.com/)
  await page.getByRole('link', { name: 'Things I’ve built', exact: true }).click()
  await expect(page).toHaveURL(/#work$/)
})

const expectHealthyPage = async (page: Page, path: string, title: string) => {
  const consoleErrors: string[] = []
  const pageErrors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  const response = await page.goto(path, { waitUntil: 'networkidle' })

  expect(response?.ok()).toBe(true)
  await expect(page).toHaveTitle(title)
  await expect(page.locator('main')).toBeVisible()
  await expect(page.locator('h1')).toHaveCount(1)
  expect(consoleErrors).toEqual([])
  expect(pageErrors).toEqual([])

  const overflow = await page.evaluate(() => (
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  ))
  expect(overflow).toBeLessThanOrEqual(0)

  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(accessibility.violations).toEqual([])
}

for (const route of routes) {
  test(`${route.path} passes desktop health and accessibility checks`, async ({ page }) => {
    await expectHealthyPage(page, route.path, route.title)
  })

  test(`${route.path} passes mobile health, accessibility, and target-size checks`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await expectHealthyPage(page, route.path, route.title)

    const undersizedTargets = await page.locator('a[href], button').evaluateAll((elements) => (
      elements.flatMap((element) => {
        const style = getComputedStyle(element)
        const box = element.getBoundingClientRect()
        const visible = style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0 && box.height > 0

        if (!visible || (box.width >= 44 && box.height >= 44)) return []
        return [{
          name: element.getAttribute('aria-label') || element.textContent?.trim() || element.tagName,
          width: Math.round(box.width * 10) / 10,
          height: Math.round(box.height * 10) / 10,
        }]
      })
    ))

    expect(undersizedTargets).toEqual([])
  })
}

test('old work route redirects to homepage projects', async ({ page }) => {
  await page.goto('/work')
  await expect(page).toHaveURL(/\/#work$/)
  await expect(page.getByRole('heading', { name: 'Things I’ve built.' })).toBeVisible()
})

test('personal homepage remains usable with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('link', { name: 'Get in touch', exact: true }).click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.getByRole('link', { name: 'nicktperez@gmail.com' })).toBeVisible()
})

test('Caldor story opens and closes with the keyboard', async ({ page }) => {
  await page.goto('/')
  const story = page.locator('.signal-fire-details')
  const summary = story.locator('summary')
  await expect(story).not.toHaveAttribute('open')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(story).toHaveAttribute('open', '')
  await expect(story.getByText('The servers and files there became unreachable.', { exact: false })).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(story).not.toHaveAttribute('open')
})

test('career timeline reveals job details without losing the compact summary', async ({ page }) => {
  await page.goto('/')
  const role = page.locator('.signal-timeline-role').first()
  await expect(role).not.toHaveAttribute('open')
  await role.locator('summary').click()
  await expect(role).toHaveAttribute('open', '')
  await expect(role.locator('.signal-role-period')).toBeVisible()
  await expect(role.locator('li').first()).toBeVisible()
  await role.locator('summary').click()
  await expect(role).not.toHaveAttribute('open')
})

test('story icon stays anchored and job title stays level when expanded', async ({ page }) => {
  await page.goto('/')
  const icon = page.locator('.signal-fire-icon')
  const before = await icon.boundingBox()
  await page.locator('.signal-fire-details summary').click()
  const after = await icon.boundingBox()
  expect(after!.x).toBeCloseTo(before!.x, 0)
  expect(after!.y).toBeCloseTo(before!.y, 0)
  await page.locator('.signal-timeline-role summary').first().click()
  expect(await page.locator('.signal-timeline-role summary > span').first().evaluate(element => getComputedStyle(element).transform)).toBe('none')
})

test('glass button retains its fill on hover', async ({ page }) => {
  await page.goto('/')
  const button = page.getByRole('link', { name: 'Get in touch', exact: true })
  const before = await button.evaluate(element => getComputedStyle(element).backgroundImage)
  await button.hover()
  expect(await button.evaluate(element => getComputedStyle(element).backgroundImage)).toBe(before)
})

test('resume is available immediately and mobile images sit below the copy', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute('href', '/NicholasPerezResume.pdf')
  await expect(page.getByRole('link', { name: 'View my résumé' })).toHaveAttribute('href', '/NicholasPerezResume.pdf')
  for (const selector of ['.signal-about', '.signal-contact']) {
    const section = page.locator(selector)
    const image = section.locator('.signal-mobile-scene')
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    const layout = await section.evaluate(element => {
      const image = element.querySelector('img')!.getBoundingClientRect()
      const heading = element.querySelector('h2')!.getBoundingClientRect()
      return { imageTop: image.top, headingBottom: heading.bottom }
    })
    expect(layout.imageTop).toBeGreaterThan(layout.headingBottom)
  }
})

test('glass hover stays stable along the lower edge without moving the button', async ({ page }) => {
  await page.goto('/')
  for (const name of ['A little about me', 'Get in touch', 'Send me an email']) {
    const button = page.getByRole('link', { name, exact: true })
    await button.scrollIntoViewIfNeeded()
    const before = await button.boundingBox()
    await page.mouse.move(before!.x + before!.width / 2, before!.y + before!.height - 1)
    for (let sample = 0; sample < 5; sample++) {
      await page.waitForTimeout(80)
      expect(await button.evaluate(element => element.matches(':hover'))).toBe(true)
      expect(await button.evaluate(element => getComputedStyle(element).transform)).toBe('none')
      const after = await button.boundingBox()
      expect(after!.y).toBeCloseTo(before!.y, 2)
    }
  }
})
