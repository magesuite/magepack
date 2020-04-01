const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const collectModules = require('../collectModules');

const baseConfig = {
    url: [],
    name: 'product',
    modules: {},
};

/**
 * Prepares a bundle configuration for all modules loaded on product pages.
 *
 * @param {BrowserContext} browserContext Puppeteer's BrowserContext object.
 * @param {object} configuration Generation configuration object.
 * @param {string} configuration.productUrl URL to the product page.
 */
const product = async (browserContext, { productUrl }) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.info(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();
    await page.goto(productUrl, { waitUntil: 'networkidle0' });

    merge(bundleConfig.modules, await collectModules(page));

    page.close();

    logger.success(`Finished collecting modules for bundle "${bundleName}".`);

    return bundleConfig;
};

module.exports = product;
