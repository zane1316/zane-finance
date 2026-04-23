const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:4173';

async function dismissOnboarding(page) {
  await page.evaluate(() => {
    const el = document.getElementById('onboarding');
    if (el) el.classList.add('hidden');
  });
}

test.describe('Zane Finance v8.1 Bug Fixes', () => {

  test('Kline charts render correctly', async ({ page }) => {
    await page.goto(BASE_URL + '/#kline');
    await page.waitForTimeout(1500);
    await dismissOnboarding(page);

    // Check that chart containers exist and have canvas or svg children
    const charts = await page.locator('[id^="kline-chart-"]').all();
    console.log(`Found ${charts.length} kline chart containers`);
    expect(charts.length).toBeGreaterThan(0);

    // Check none of them show "图表加载失败"
    for (const chart of charts) {
      const text = await chart.textContent();
      expect(text).not.toContain('图表加载失败');
    }

    // Switch to combo tab and check again
    await page.click('button[data-cat="combo"]');
    await page.waitForTimeout(800);
    const comboCharts = await page.locator('[id^="kline-chart-"]').all();
    expect(comboCharts.length).toBeGreaterThan(0);

    // Switch to trend tab
    await page.click('button[data-cat="trend"]');
    await page.waitForTimeout(800);
    const trendCharts = await page.locator('[id^="kline-chart-"]').all();
    expect(trendCharts.length).toBeGreaterThan(0);
  });

  test('Auth modal shows feature comparison', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(500);
    await dismissOnboarding(page);

    // Click login button to open modal
    await page.click('#auth-btn');
    await page.waitForTimeout(300);

    const modal = page.locator('#auth-modal');
    await expect(modal).not.toHaveClass(/hidden/);

    // Check feature comparison text exists
    const modalText = await modal.textContent();
    expect(modalText).toContain('不登录');
    expect(modalText).toContain('登录后');
    expect(modalText).toContain('所有功能正常使用');
    expect(modalText).toContain('自动同步云端');
  });

  test('Stock search shows proper fallback when API fails', async ({ page }) => {
    // Block tencent API to simulate failure
    await page.route('https://qt.gtimg.cn/**', route => route.abort('blockedbyclient'));

    await page.goto(BASE_URL + '/#market');
    await page.waitForTimeout(1000);
    await dismissOnboarding(page);

    // Type search query
    await page.fill('#market-search', '茅台');
    await page.click('#market-search-btn');
    await page.waitForTimeout(2000);

    // Check search results area is visible
    const searchResults = page.locator('#search-results');
    await expect(searchResults).not.toHaveClass(/hidden/);

    // Should show "暂无实时数据" instead of infinite "同步中..."
    const cardsText = await page.locator('#search-result-cards').textContent();
    console.log('Search cards text:', cardsText.substring(0, 200));
    expect(cardsText).not.toContain('同步中...');
    expect(cardsText).toContain('暂无实时数据');
  });

  test('No console errors on navigation', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto(BASE_URL);
    await page.waitForTimeout(500);

    // Navigate through all sections
    const sections = ['market', 'funds', 'learning', 'kline', 'trading', 'calculator', 'glossary'];
    for (const section of sections) {
      await page.goto(`${BASE_URL}/#${section}`);
      await page.waitForTimeout(800);
    }

    // Filter out expected warnings and network errors
    const seriousErrors = errors.filter(e =>
      !e.includes('can\'t be bundled') &&
      !e.includes('Source map') &&
      !e.includes('API timeout') &&
      !e.includes('API load failed') &&
      !e.includes('Failed to load resource') &&
      !e.includes('net::ERR_')
    );

    if (seriousErrors.length > 0) {
      console.log('Console errors:', seriousErrors);
    }
    expect(seriousErrors.length).toBe(0);
  });
});
