const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/ar', { waitUntil: 'networkidle' });
  const errorText = await page.evaluate(() => {
    const portal = document.querySelector('nextjs-portal');
    if (portal && portal.shadowRoot) {
      return portal.shadowRoot.textContent;
    }
    return 'No Next.js error overlay found';
  });
  console.log('--- ERROR PORTAL ---');
  console.log(errorText.substring(0, 1000));
  await browser.close();
})();
