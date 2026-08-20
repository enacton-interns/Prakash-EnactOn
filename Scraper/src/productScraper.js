// Product page scraper: extracts product details
const { selectors } = require('./config');
const { cleanText, cleanPrice, extractRatingNumber } = require('./utils');

async function extractWithFallback(page, selectorList) {
    if (!Array.isArray(selectorList)) return null;
    for (const selector of selectorList) {
        try {
            const locator = page.locator(selector).first();
            if ((await locator.count()) === 0) continue;
            const text = await locator.textContent({ timeout: 3000 });
            const cleaned = text ? text.trim() : null;
            if (cleaned) return cleaned;
        } catch {
            continue;
        }
    }
    return null;
}

async function extractDescription(page) {
    for (const selector of selectors.product.description) {
        try {
            const locators = page.locator(selector);
            const count = await locators.count();
            if (count > 0) {
                const texts = [];
                for (let i = 0; i < Math.min(count, 10); i++) {
                    const t = await locators.nth(i).textContent({ timeout: 2000 });
                    if (t && t.trim()) texts.push(t.trim());
                }
                if (texts.length > 0) {
                    return texts.join(' | ').slice(0, 2500);
                }
            }
        } catch {
            continue;
        }
    }
    return null;
}

async function scrapeProduct(page, productUrl) {
    try {
        await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch {
        // Continue even if navigation times out
    }

    // Dismiss Amazon "Continue shopping" interstitial if present
    const continueBtn = page.locator('input[value="Continue shopping"], button:has-text("Continue shopping")').first();
    if ((await continueBtn.count()) > 0) {
        await continueBtn.click();
        await page.waitForTimeout(2000);
    } else {
        await page.waitForTimeout(1500);
    }

    const name = await extractWithFallback(page, selectors.product.title);
    const cleanedName = cleanText(name);
    if (!cleanedName) return null;

    const rawPrice = await extractWithFallback(page, selectors.product.price);
    const brand = await extractWithFallback(page, selectors.product.brand);
    const rawRating = await extractWithFallback(page, selectors.product.rating);
    const description = await extractDescription(page);

    return {
        name: cleanedName,
        price: cleanPrice(rawPrice) || '',
        brand: cleanText(brand) || '',
        rating: extractRatingNumber(rawRating) || '',
        description: description || '',
        url: productUrl,
    };
}

module.exports = { scrapeProduct };
