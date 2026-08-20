# Amazon Product Scraper

A simple Amazon search scraper built with Node.js and Playwright.

## Installation

```bash
npm install
npx playwright install chromium
```

## Usage

```bash
# Basic run (default limit: 20, pages: 1)
node src/index.js "https://www.amazon.com/s?k=laptop"

# Custom limit and page count
node src/index.js "https://www.amazon.com/s?k=laptop" --limit 10 --pages 2
```

## Output

Scraped product data is saved directly to:
```
data/products.csv
```

### CSV Columns
- `name`
- `price`
- `brand`
- `rating`
- `description`
- `url`
