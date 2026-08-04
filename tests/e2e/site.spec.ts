import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const routes = [
  { path: '/', title: 'Nicholas Perez | IT Systems Engineer' },
  { path: '/work', title: 'Project Archive | Nicholas Perez' },
]

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

test('theme persists and updates browser chrome color', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.setItem('portfolio-theme', 'light'))
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#17191e')
  await page.reload({ waitUntil: 'networkidle' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('mobile navigation contains focus and restores it after Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/work')
  const trigger = page.getByRole('button', { name: 'Open navigation' })

  await trigger.click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Home' })).toBeFocused()
  await page.keyboard.press('Escape')

  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
})

test('demo videos remain network-idle until the visitor presses play', async ({ page }) => {
  const mediaRequests: string[] = []
  page.on('request', (request) => {
    if (/\.mp4(?:$|\?)/.test(request.url())) mediaRequests.push(request.url())
  })

  await page.goto('/work', { waitUntil: 'networkidle' })
  const videos = page.locator('video')
  await expect(videos).toHaveCount(3)

  for (let index = 0; index < await videos.count(); index += 1) {
    await videos.nth(index).evaluate((video) => video.scrollIntoView({ block: 'center' }))
    await page.waitForTimeout(150)
  }

  expect(mediaRequests).toEqual([])
  expect(await videos.evaluateAll((elements) => elements.map((video) => video.preload))).toEqual(['none', 'none', 'none'])
})
