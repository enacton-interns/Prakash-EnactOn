// Helper functions for cleaning extracted text and delays
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function cleanText(text) {
    if (!text) return null;
    const cleaned = String(text).replace(/\s+/g, ' ').trim();
    return cleaned || null;
}

function cleanPrice(text) {
    if (!text) return null;
    const trimmed = text.replace(/\s+/g, ' ').trim();
    if (!trimmed) return null;

    const symbolMatch = trimmed.match(/[\$£€¥₹]\s*[\d,]+\.?\d*/);
    if (symbolMatch) return symbolMatch[0].replace(/\s+/g, '');

    const textMatch = trimmed.match(/([A-Z]{2,4})\s*([\d,]+\.?\d*)/);
    if (textMatch) return `${textMatch[1]}${textMatch[2]}`;

    const numMatch = trimmed.match(/[\d,]+\.\d{2}/);
    if (numMatch) return numMatch[0];

    return null;
}

function extractRatingNumber(ratingText) {
    if (!ratingText) return null;
    const match = ratingText.match(/(\d+(\.\d+)?)/);
    return match ? match[1] : null;
}

module.exports = {
    delay,
    cleanText,
    cleanPrice,
    extractRatingNumber,
};
