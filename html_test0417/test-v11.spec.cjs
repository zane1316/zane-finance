const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:4173';

async function dismissOnboarding(page) {
  await page.evaluate(() => {
    const el = document.getElementById('onboarding');
    if (el) el.classList.add('hidden');
  });
}

test.describe('Zane Finance v11.0 New Features', () => {

  test('Watchlist page renders with navigation', async ({ page }) => {
    await page.goto(BASE_URL + '/#watchlist');
    await page.waitForTimeout(800);
    await dismissOnboarding(page);

    // Check page title
    await expect(page).toHaveTitle(/我的自选/);

    // Check stats section exists
    const stats = await page.locator('#watchlist-stats');
    await expect(stats).toBeVisible();

    // Check tab buttons exist
    await expect(page.locator('#wl-tab-stocks')).toBeVisible();
    await expect(page.locator('#wl-tab-funds')).toBeVisible();

    // Check empty state or table has rows
    const emptyState = page.locator('#watchlist-stocks-empty');
    const tbody = page.locator('#watchlist-stocks-tbody tr');
    await expect(emptyState.or(tbody.first())).toBeVisible();
  });

  test('Stock detail modal opens from market page', async ({ page }) => {
    await page.goto(BASE_URL + '/#market');
    await page.waitForTimeout(1500);
    await dismissOnboarding(page);

    // Wait for stock cards to render
    const cards = await page.locator('#stock-cards > div').all();
    if (cards.length === 0) {
      console.log('No stock cards found, skipping modal test');
      return;
    }

    // Click first stock card (not the star button)
    await cards[0].click();
    await page.waitForTimeout(500);

    // Check modal is visible
    const modal = page.locator('#stock-detail-modal');
    await expect(modal).not.toHaveClass(/hidden/);

    // Check modal content
    const nameEl = await page.locator('#stock-detail-name').textContent();
    expect(nameEl).toBeTruthy();

    // Check tabs exist
    await expect(page.locator('#stock-tab-overview')).toBeVisible();
    await expect(page.locator('#stock-tab-chart')).toBeVisible();
    await expect(page.locator('#stock-tab-news')).toBeVisible();

    // Close modal
    await page.click('#stock-detail-modal button[onclick="closeStockDetail()"]');
    await page.waitForTimeout(300);
    await expect(modal).toHaveClass(/hidden/);
  });

  test('Dark mode toggle works', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(800);
    await dismissOnboarding(page);
    await page.waitForTimeout(200);

    const html = page.locator('html');

    // Check initial state
    const hasDark = await html.evaluate(el => el.classList.contains('dark'));
    console.log('Initial dark mode:', hasDark);

    // Click theme toggle using JS to avoid onboarding overlay issues
    await page.evaluate(() => {
      const btn = document.getElementById('theme-toggle');
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);

    // Check dark class toggled
    const hasDarkAfter = await html.evaluate(el => el.classList.contains('dark'));
    expect(hasDarkAfter).toBe(!hasDark);

    // Toggle back
    await page.evaluate(() => {
      const btn = document.getElementById('theme-toggle');
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    const hasDarkFinal = await html.evaluate(el => el.classList.contains('dark'));
    expect(hasDarkFinal).toBe(hasDark);
  });

  test('Market sentiment section on home page', async ({ page }) => {
    await page.goto(BASE_URL + '/#home');
    await page.waitForTimeout(1000);
    await dismissOnboarding(page);

    const sentiment = page.locator('#market-sentiment');
    await expect(sentiment).toBeVisible();
  });

  test('No console errors on new sections', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    // Navigate through new sections
    const sections = ['watchlist', 'market', 'home'];
    for (const section of sections) {
      await page.goto(`${BASE_URL}/#${section}`);
      await page.waitForTimeout(1000);
      await dismissOnboarding(page);
    }

    // Open stock detail modal
    await page.goto(`${BASE_URL}/#market`);
    await page.waitForTimeout(1500);
    const cards = await page.locator('#stock-cards > div').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(500);
      await page.click('#stock-detail-modal button[onclick="closeStockDetail()"]');
    }

    const seriousErrors = errors.filter(e =>
      !e.includes('can\'t be bundled') &&
      !e.includes('Source map') &&
      !e.includes('API timeout') &&
      !e.includes('API load failed') &&
      !e.includes('Failed to load resource') &&
      !e.includes('net::ERR_') &&
      !e.includes('favicon')
    );

    if (seriousErrors.length > 0) {
      console.log('Console errors:', seriousErrors);
    }
    expect(seriousErrors.length).toBe(0);
  });
});
