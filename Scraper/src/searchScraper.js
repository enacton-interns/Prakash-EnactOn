// Search page scraper: extracts product URLs and handles pagination
const { selectors } = require('./config');
const { delay } = require('./utils');

async function collectProductUrls(page, searchUrl, limit, maxPages) {
    const products = [];
    let currentUrl = searchUrl;
    let pageNum = 1;

    while (currentUrl && products.length < limit && pageNum <= maxPages) {
        console.log(`[Search] Scraping page ${pageNum}...`);
        await page.goto(currentUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(2000);

        const urls = await page.evaluate(
            ({ cardSel, linkSel }) => {
                const cards = document.querySelectorAll(cardSel);
                const seen = new Set();
                const list = [];

                cards.forEach((card) => {
                    const asin = card.getAttribute('data-asin');
                    // Find all links in the card, prioritize title links and links containing /dp/
                    const titleLink = card.querySelector('div[data-cy="title-recipe"] a, a:has(h2), a.s-line-clamp-2, a.a-link-normal.s-underline-text');
                    const dpLink = card.querySelector('a[href*="/dp/"], a[href*="/gp/product/"]');
                    const link = (titleLink && titleLink.href && !titleLink.href.startsWith('javascript:')) ? titleLink : dpLink;

                    if (link && link.href && !link.href.startsWith('javascript:')) {
                        const key = asin || link.href.split('?')[0];
                        if (!seen.has(key)) {
                            seen.add(key);
                            list.push(link.href);
                        }
                    }
                });

                return list;
            },
            {
                cardSel: selectors.search.productCard,
                linkSel: selectors.search.productLink,
            }
        );

        for (const url of urls) {
            if (products.length >= limit) break;
            products.push(url);
        }

        if (products.length >= limit || pageNum >= maxPages) break;

        // Check for next page link
        const nextLink = page.locator(selectors.search.nextPage).first();
        if ((await nextLink.count()) > 0) {
            currentUrl = await nextLink.getAttribute('href');
            if (currentUrl && !currentUrl.startsWith('http')) {
                currentUrl = `https://www.amazon.com${currentUrl}`;
            }
            pageNum++;
            await delay(1500);
        } else {
            break;
        }
    }

    return products;
}

module.exports = { collectProductUrls };
