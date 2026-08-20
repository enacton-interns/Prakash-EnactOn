// Amazon Product Scraper - Entry Point
const config = require('./config');
const { launchBrowser } = require('./browser');
const { collectProductUrls } = require('./searchScraper');
const { scrapeProduct } = require('./productScraper');
const { saveProductsToCsv } = require('./csvWriter');
const { delay } = require('./utils');

function parseArgs() {
    const args = process.argv.slice(2);
    const url = args.find((arg) => !arg.startsWith('--'));

    function getFlag(name) {
        const idx = args.indexOf(`--${name}`);
        return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
    }

    return {
        url,
        limit: parseInt(getFlag('limit') || config.defaultLimit, 10),
        pages: parseInt(getFlag('pages') || config.defaultPages, 10),
    };
}

async function main() {
    const { url, limit, pages } = parseArgs();

    if (!url) {
        console.log('\nUsage: node src/index.js "<amazon-search-url>" [--limit <n>] [--pages <n>]\n');
        process.exit(1);
    }

    console.log(`\nStarting scraper for: ${url}`);
    console.log(`Limit: ${limit} | Pages: ${pages}\n`);

    const { browser, context } = await launchBrowser(true);

    try {
        const searchPage = await context.newPage();
        const productUrls = await collectProductUrls(searchPage, url, limit, pages);
        await searchPage.close();

        console.log(`\nFound ${productUrls.length} products. Scraping details...\n`);

        const results = [];
        for (let i = 0; i < productUrls.length; i++) {
            const productUrl = productUrls[i];
            const page = await context.newPage();
            try {
                const data = await scrapeProduct(page, productUrl);
                if (data) {
                    results.push(data);
                    console.log(`[${i + 1}/${productUrls.length}] success: ${data.name.slice(0, 50)}...`);
                } else {
                    console.log(`[${i + 1}/${productUrls.length}] fail: ${productUrl}`);
                }
            } catch (err) {
                console.log(`[${i + 1}/${productUrls.length}] Error: ${err.message}`);
            } finally {
                await page.close();
            }
            await delay(1000);
        }

        await saveProductsToCsv(results, config.outputPath);
        console.log(`\nDone! Scraped ${results.length} products successfully.`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    } finally {
        await browser.close();
    }
}

main();
