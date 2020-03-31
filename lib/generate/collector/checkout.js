/* global document, BASE_URL */

const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const collectModules = require('../collectModules');

const baseConfig = {
    url: {},
    name: 'checkout',
    modules: {},
};

module.exports = async (browserContext, { productUrl }) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.debug(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();
    await page.goto(productUrl, { waitUntil: 'networkidle0' });

    // Select option for every swatch if there are any.
    const swatches = await page.$$('#product_addtocart_form .swatch-attribute');
    for (let swatchIndex = 1; swatchIndex <= swatches.length; swatchIndex++) {
        await page.click(
            `#product_addtocart_form .swatch-attribute:nth-child(${swatchIndex}) .swatch-option:not([disabled])`
        );
    }

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.evaluate(() =>
            document.querySelector('#product_addtocart_form').submit()
        ),
    ]);

    const baseUrl = await page.evaluate(() => BASE_URL);

    await page.goto(`${baseUrl}checkout/cart`, { waitUntil: 'networkidle0' });
    const cartModules = await collectModules(page);

    await page.goto(`${baseUrl}checkout`, { waitUntil: 'networkidle0' });
    const checkoutModules = await collectModules(page);

    page.close();

    logger.debug(`Finished collecting modules for bundle "${bundleName}".`);

    merge(bundleConfig.modules, cartModules, checkoutModules);

    return bundleConfig;
};
