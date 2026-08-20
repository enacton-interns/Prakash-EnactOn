// Browser setup with stealth settings
const { chromium } = require('playwright');

async function launchBrowser(headless = true) {
    const browser = await chromium.launch({
        headless,
        args: ['--disable-blink-features=AutomationControlled', '--no-sandbox'],
        ignoreDefaultArgs: ['--enable-automation'],
    });

    const context = await browser.newContext({
        viewport: { width: 1366, height: 768 },
        locale: 'en-US',
        userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    });

    await context.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        window.chrome = { runtime: {} };
    });

    return { browser, context };
}

module.exports = { launchBrowser };
