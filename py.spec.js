const { test, expect, firefox, chromium } = require('@playwright/test');

test('should open Myntra URL with extended headers in Firefox', async () => {
    const browser = await firefox.launch({ headless: true });
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

    const context = await browser.newContext({
        userAgent: userAgent,
        viewport: { width: 1280, height: 800 },
        locale: 'en-US',
        timezoneId: 'Asia/Kolkata',
        extraHTTPHeaders: {
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Referer': 'https://www.myntra.com/',
        }
    });

    const page = await context.newPage();
    const url = 'https://www.myntra.com/silver-coins/saraf+rs+jewellery/saraf-rs-jewellery-empress-999-silver-coin-10gram/24476262/buy';

    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    expect(page.url()).toBe(url);

    const element = page.locator('text=FLAT300');
  // This will fail if such an element is not found or not visible
    await expect(element).toBeVisible();

    console.log('Test passed: Element with text "NORETURNS10" is visible.');


    await browser.close();
});
