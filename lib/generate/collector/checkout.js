/* global document, BASE_URL */

const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const authenticate = require('../authenticate');
const collectModules = require('../collectModules');

const baseConfig = {
    url: {},
    name: 'checkout',
    modules: {},
};

/**
 * Prepares a bundle configuration for all modules loaded on cart and checkout pages.
 *
 * @param {BrowserContext} browserContext Puppeteer's BrowserContext object.
 * @param {object} configuration Generation configuration object.
 * @param {string} configuration.productUrl URL to the product page.
 * @param {string} configuration.authUsername Basic auth username.
 * @param {string} configuration.authPassword Basic auth password.
 */
const checkout = async (
    browserContext,
    { productUrl, authUsername, authPassword }
) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.info(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();

    await authenticate(page, authUsername, authPassword);

    await page.goto(productUrl, { waitUntil: 'networkidle0' });

    // Select option for every swatch if there are any.
    await page.evaluate(() => {
        const swatches = document.querySelectorAll(
            '.product-options-wrapper .swatch-attribute'
        );
        Array.from(swatches).forEach((swatch) => {
            const swatchOption = swatch.querySelector(
                '.swatch-option:not([disabled])'
            );
            swatch.querySelector('.swatch-input').value =
                swatchOption.getAttribute('option-id') ||
                swatchOption.getAttribute('data-option-id');
        });

        if (swatches.length) {
            return;
        }

        Array.from(
            document.querySelectorAll(
                '.product-options-wrapper .super-attribute-select'
            )
        ).forEach((select) => {
            select.value = Array.from(select.options).reduce(
                (selectedValue, option) => {
                    return (
                        selectedValue ||
                        (option.value ? option.value : selectedValue)
                    );
                },
                null
            );
        });
    });

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

    merge(bundleConfig.modules, cartModules, checkoutModules);

    await page.close();

    logger.success(`Finished collecting modules for bundle "${bundleName}".`);

    return bundleConfig;
};

module.exports = checkout;
