// Central configuration for selectors and defaults
module.exports = {
    defaultLimit: 20,
    defaultPages: 1,
    outputPath: 'data/products.csv',

    selectors: {
        search: {
            productCard: 'div[data-asin]',
            productLink: 'div[data-cy="title-recipe"] a, a:has(h2), a.a-link-normal.s-line-clamp-2, h2 a',
            nextPage: 'a.s-pagination-next',
        },
        product: {
            title: ['#productTitle', 'h1 span#productTitle', '#title', 'h1'],
            price: [
                '.a-price .a-offscreen',
                '#corePrice_feature_div .a-offscreen',
                '#apex_offerDisplay_desktop .a-offscreen',
                '#tp_price_block_total_price_ww .a-offscreen',
                '.priceToPay .a-offscreen',
                '.a-price',
            ],
            brand: ['#bylineInfo', '.po-brand .po-break-word', '#brand'],
            rating: ['#acrPopover span.a-icon-alt', '#averageCustomerReviews span.a-icon-alt'],
            description: ['#productDescription p', '#feature-bullets .a-list-item', '#aplus p'],
        },
    },
};
