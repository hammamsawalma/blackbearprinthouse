const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/ar', { waitUntil: 'networkidle' });
  const text = await page.evaluate(() => document.body.innerText);
  console.log('--- PAGE TEXT ---');
  console.log(text.substring(0, 1000));
  await browser.close();
})();
