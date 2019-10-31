const merge = require('lodash.merge');
const collectDependencies = require('../dependencies/collect');

const baseConfig = {
    url: {},
    module: {
        name: 'bundles/checkout',
        create: true,
        exclude: ['requirejs/require', 'prototype', 'legacy-build.min'],
    },
};

module.exports = async (browser, config) => {
    config = merge({}, baseConfig, config);

    console.log(`[${config.module.name}] Collecting dependencies...`);

    const page = await browser.newPage();

    await page.setCacheEnabled(false);
    await page.goto(config.url.product, { waitUntil: 'networkidle0' });
    // Select option for every swatch if there are any.

    const swatches = await page.$$('#product_addtocart_form .swatch-attribute');
    for (let swatchIndex = 1; swatchIndex < swatches.length; swatchIndex++) {
        console.log(swatchIndex);
        await page.click(
            `#product_addtocart_form .swatch-attribute:nth-child(${swatchIndex}) .swatch-option:not([disabled])`
        );
    }

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.evaluate(() =>
            // eslint-disable-next-line no-undef
            document.querySelector('#product_addtocart_form').submit()
        ),
    ]);

    await page.goto(config.url.cart, { waitUntil: 'networkidle0' });
    const cartDependencies = await collectDependencies(
        page,
        config.excludeRegExp
    );

    await page.goto(config.url.checkout, { waitUntil: 'networkidle0' });
    const checkoutDependencies = await collectDependencies(
        page,
        config.excludeRegExp
    );

    const include = Array.from(
        new Set([...cartDependencies, ...checkoutDependencies])
    );

    page.close();

    console.log(`[${config.module.name}] Done.`);

    return merge({}, config.module, { include });
};
