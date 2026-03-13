const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('http://localhost:3000/ar', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'hero-debug.png' });
  await browser.close();
})();
