const merge = require('lodash.merge');
const path = require('path');

const logger = require('../../utils/logger');
const authenticate = require('../authenticate');
const collectModules = require('../collectModules');
const blockMagepack = require('../blockMagepack');

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
 * @param {string} configuration.authUsername Basic auth username.
 * @param {string} configuration.authPassword Basic auth password.
 * @param {int} configuration.timeout Page navigation timeout.
 */
const product = async (
    browserContext,
    {
        productUrl,
        authUsername,
        authPassword,
        timeout,
        screenshot,
        screenshotPath,
        excludedModules,
    }
) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.info(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();

    blockMagepack(page);

    timeout && (await page.setDefaultNavigationTimeout(timeout));

    await authenticate(page, authUsername, authPassword);

    await page.goto(productUrl, { waitUntil: 'networkidle0' });

    if (screenshot) {
        await page.screenshot({
            path: path.join(screenshotPath, `magepack-${bundleName}.png`),
            fullPage: true,
        });
    }

    merge(bundleConfig.modules, await collectModules(page, excludedModules));

    await page.close();

    logger.success(`Finished collecting modules for bundle "${bundleName}".`);

    return bundleConfig;
};

module.exports = product;
