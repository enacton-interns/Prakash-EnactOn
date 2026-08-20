// CSV writer for saving scraped products
const path = require('path');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const CSV_COLUMNS = [
    { id: 'name', title: 'name' },
    { id: 'price', title: 'price' },
    { id: 'brand', title: 'brand' },
    { id: 'rating', title: 'rating' },
    { id: 'description', title: 'description' },
    { id: 'url', title: 'url' },
];

async function saveProductsToCsv(products, outputPath = 'data/products.csv') {
    if (!products || products.length === 0) return;

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const writer = createCsvWriter({
        path: outputPath,
        header: CSV_COLUMNS,
        alwaysQuote: true,
    });

    await writer.writeRecords(products);
    console.log(`Saved ${products.length} products to ${outputPath}`);
}

module.exports = { saveProductsToCsv };
