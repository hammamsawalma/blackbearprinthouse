const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/ar', { waitUntil: 'networkidle' });
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log(html.substring(0, 5000));
  await browser.close();
})();
