import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const routes = [
  { path: '/', title: 'Nicholas Perez | IT Systems Engineer' },
  { path: '/work', title: 'Project Archive | Nicholas Perez' },
]

test('desk objects open accessible panels and restore keyboard focus', async ({ page }) => {
  await page.goto('/')
  const photo = page.locator('.desk-photo')
  await expect(photo).toBeVisible()
  expect(await photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  const projects = page.locator('.desk-monitor')
  await projects.click()
  const panel = page.getByRole('dialog', { name: 'Projects', exact: true })
  await expect(panel).toBeVisible()
  await expect(panel.getByText('MacTrace', { exact: true }).first()).toBeVisible()
  await panel.evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)))
  const bounds = await panel.boundingBox()
  expect(bounds?.width).toBe(1440)
  expect(bounds?.height).toBe(1000)
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(accessibility.violations).toEqual([])
  await page.keyboard.press('Escape')
  await expect(panel).not.toBeVisible()
  await expect(projects).toBeFocused()
  await page.locator('.desk-orbit').click()
  await expect(page.getByRole('dialog', { name: 'OrbitLab', exact: true })).toBeVisible()
  await expect(page.locator('video')).toHaveCount(1)
  await page.getByRole('button', { name: 'Close panel and return to desk' }).click()
  await expect(page.locator('video')).toHaveCount(0)
  await page.goto('/#contact')
  await expect(page.getByRole('dialog', { name: 'Contact', exact: true })).toBeVisible()
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

test('theme persists and updates browser chrome color', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.setItem('portfolio-theme', 'light'))
  await page.reload({ waitUntil: 'networkidle' })
  const lightPoster = await page.locator('.poster-hero').evaluate((element) => {
    const style = getComputedStyle(element)
    return { backgroundColor: style.backgroundColor, color: style.color, scheme: style.colorScheme }
  })
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#17191e')
  const darkPoster = await page.locator('.poster-hero').evaluate((element) => {
    const style = getComputedStyle(element)
    return { backgroundColor: style.backgroundColor, color: style.color, scheme: style.colorScheme }
  })
  expect(darkPoster).not.toEqual(lightPoster)
  expect(darkPoster.scheme).toBe('dark')
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


test('desk motion pauses and reduced motion skips the camera flight', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Pause desk motion' }).click()
  const canvas = page.locator('.desk-activity')
  const still = await canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())
  await page.waitForTimeout(200)
  expect(await canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())).toBe(still)
  await page.getByRole('button', { name: 'Resume desk motion' }).click()
  await expect.poll(() => canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())).not.toBe(still)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('.desk-monitor').click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  expect(await dialog.evaluate(element => element.getAnimations().length)).toBe(0)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})

test('camera flight can reverse before it finishes and browser Back returns to desk', async ({ page }) => {
  await page.goto('/')
  await page.locator('.desk-monitor').click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await page.locator('.desk-notebook').click()
  await expect(page.getByRole('dialog', { name: 'Experience', exact: true })).toBeVisible()
  await page.goBack()
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.locator('.desk-notebook')).toBeFocused()
})

test('desktop writes code, switches to research, and opens its browser before the flight', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.clock.install()
  await page.goto('/')
  const screen = page.locator('.desk-screen')
  await expect(screen).toHaveAttribute('data-scene', 'editor')
  await page.clock.runFor(10000)
  await expect(screen).toHaveAttribute('data-scene', 'error')
  await page.clock.runFor(4000)
  await expect(screen).toHaveAttribute('data-scene', 'research')
  await page.clock.runFor(18000)
  await expect(screen).toHaveAttribute('data-scene', 'terminal')
  await page.clock.runFor(4000)
  await expect(screen).toHaveAttribute('data-scene', 'orbit-result')
  await page.locator('.desk-monitor').click()
  await page.clock.runFor(460)
  await expect(screen).toHaveAttribute('data-scene', 'opening-browser')
  await expect(page.getByRole('dialog').getByText('MacTrace', {exact:true}).first()).toBeVisible()
  await page.clock.runFor(1100)
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.locator('dialog')).toHaveCSS('opacity', '1')
  expect(errors).toEqual([])
})


test('the entire desk and its controls fit a laptop viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 })
  await page.goto('/')
  const scene = await page.locator('.desk-scene').boundingBox()
  expect(scene!.y + scene!.height).toBeLessThanOrEqual(769)
  for (const selector of ['.desk-monitor', '.desk-notebook', '.desk-orbit', '.desk-envelope']) {
    const label = await page.locator(selector + ' > span').boundingBox()
    expect(label!.y).toBeGreaterThanOrEqual(0)
    expect(label!.y + label!.height).toBeLessThanOrEqual(768)
    expect(label!.x + label!.width).toBeLessThanOrEqual(1366)
  }
})
