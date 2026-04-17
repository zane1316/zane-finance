import { chromium, devices } from '@playwright/test';

const baseURL = 'http://localhost:8080';

async function screenshot(page, name, hash) {
  await page.evaluate((h) => { window.location.hash = h; }, hash);
  if (hash === 'market') await page.waitForTimeout(10000);
  else if (hash === 'kline') await page.waitForTimeout(3000);
  else await page.waitForTimeout(2000);
  await page.screenshot({ path: `test_${name}.png`, fullPage: true });
  console.log(`Screenshot: test_${name}.png`);
}

(async () => {
  const browser = await chromium.launch();

  // Desktop
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const dPage = await desktop.newPage();
  await dPage.addInitScript(() => localStorage.setItem('zfinance_onboarding', '1'));
  await dPage.goto(baseURL, { waitUntil: 'networkidle' });
  await screenshot(dPage, 'home_desktop', 'home');
  await screenshot(dPage, 'market_desktop', 'market');
  await screenshot(dPage, 'learning_desktop', 'learning');
  await screenshot(dPage, 'kline_desktop', 'kline');
  await screenshot(dPage, 'trading_desktop', 'trading');
  await screenshot(dPage, 'ai_desktop', 'ai');
  await dPage.close();

  // Mobile
  const mobile = await browser.newContext(devices['iPhone 12 Pro']);
  const mPage = await mobile.newPage();
  await mPage.addInitScript(() => localStorage.setItem('zfinance_onboarding', '1'));
  await mPage.goto(baseURL, { waitUntil: 'networkidle' });
  await screenshot(mPage, 'home_mobile', 'home');
  await screenshot(mPage, 'market_mobile', 'market');
  await mPage.close();

  await browser.close();
  console.log('All screenshots captured.');
})();
