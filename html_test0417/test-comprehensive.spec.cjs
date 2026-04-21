const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:4173';

async function dismissOnboarding(page) {
  await page.evaluate(() => {
    const el = document.getElementById('onboarding');
    if (el) el.classList.add('hidden');
  });
}

test.describe('Zane Finance Comprehensive Tests', () => {

  test('Kline: all 4 categories render charts', async ({ page }) => {
    await page.goto(BASE_URL + '/#kline');
    await page.waitForTimeout(1500);
    await dismissOnboarding(page);

    const categories = ['single', 'combo', 'trend', 'indicator'];
    for (const cat of categories) {
      await page.click(`button[data-cat="${cat}"]`);
      await page.waitForTimeout(800);

      const charts = await page.locator('[id^="kline-chart-"]').all();
      expect(charts.length).toBeGreaterThan(0);

      // None should show "图表加载失败"
      for (let i = 0; i < Math.min(charts.length, 3); i++) {
        const text = await charts[i].textContent();
        expect(text).not.toContain('图表加载失败');
      }

      // At least one chart should have canvas content (tv-lightweight-charts class)
      const hasCanvas = await page.evaluate(() => {
        return !!document.querySelector('[id^="kline-chart-"] .tv-lightweight-charts');
      });
      expect(hasCanvas).toBe(true);
    }
  });

  test('Login modal: feature comparison + button feedback', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(500);
    await dismissOnboarding(page);

    // Open modal
    await page.click('#auth-btn');
    await page.waitForTimeout(300);

    const modal = page.locator('#auth-modal');
    await expect(modal).not.toHaveClass(/hidden/);

    // Check feature comparison
    const modalText = await modal.textContent();
    expect(modalText).toContain('不登录');
    expect(modalText).toContain('登录后');
    expect(modalText).toContain('所有功能正常使用');
    expect(modalText).toContain('自动同步云端');

    // Check the bg-gray-50 comparison box exists
    const hintBox = await page.locator('#auth-modal .bg-gray-50').count();
    expect(hintBox).toBeGreaterThan(0);

    // Test email form submit (without Supabase it should show friendly message)
    await page.fill('#auth-email', 'test@example.com');
    await page.click('#auth-form button[type="submit"]');
    await page.waitForTimeout(800);

    const msgText = await page.locator('#auth-message').textContent();
    expect(msgText.length).toBeGreaterThan(0); // Should show some message
    console.log('Email login message:', msgText);

    // Reset form
    await page.evaluate(() => { document.getElementById('auth-message').classList.add('hidden'); });

    // Test GitHub button click (only if visible — may be hidden when provider not configured)
    const githubVisible = await page.locator('#auth-github').isVisible().catch(() => false);
    if (githubVisible) {
      await page.click('#auth-github');
      await page.waitForTimeout(800);
      const githubMsg = await page.locator('#auth-message').textContent();
      expect(githubMsg.length).toBeGreaterThan(0);
      console.log('GitHub login message:', githubMsg);
    } else {
      console.log('GitHub button hidden (provider not configured), skipping GitHub click test');
    }
  });

  test('Stock search: no infinite syncing, shows refresh button', async ({ page }) => {
    // Block tencent API
    await page.route('https://qt.gtimg.cn/**', route => route.abort('blockedbyclient'));

    await page.goto(BASE_URL + '/#market');
    await page.waitForTimeout(1000);
    await dismissOnboarding(page);

    // Search for a stock
    await page.fill('#market-search', '茅台');
    await page.click('#market-search-btn');
    await page.waitForTimeout(2500);

    // Search results should be visible
    const searchResults = page.locator('#search-results');
    await expect(searchResults).not.toHaveClass(/hidden/);

    const cardsText = await page.locator('#search-result-cards').textContent();
    console.log('Search cards:', cardsText.substring(0, 300));

    // Should NOT show infinite "同步中..."
    expect(cardsText).not.toContain('同步中...');

    // Should show "暂无实时数据"
    expect(cardsText).toContain('暂无实时数据');

    // Should show "点击刷新" button
    expect(cardsText).toContain('点击刷新');
  });

  test('No JS errors across all sections', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push('pageerror: ' + err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push('console: ' + msg.text());
    });

    const sections = ['home', 'market', 'funds', 'learning', 'kline', 'ai', 'trading', 'calculator', 'glossary', 'resources', 'contact'];
    for (const section of sections) {
      await page.goto(`${BASE_URL}/#${section}`);
      await page.waitForTimeout(1000);
      await dismissOnboarding(page);
      await page.waitForTimeout(500);
    }

    const serious = errors.filter(e =>
      !e.includes('can\'t be bundled') &&
      !e.includes('Source map') &&
      !e.includes('API timeout') &&
      !e.includes('API load failed') &&
      !e.includes('Failed to load resource') &&
      !e.includes('net::ERR_')
    );

    if (serious.length > 0) console.log('Serious errors:', serious);
    expect(serious.length).toBe(0);
  });
});
