const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const authenticate = require('../authenticate');
const blockMagepack = require('../blockMagepack');
const collectModules = require('../collectModules');

const baseConfig = {
    url: '',
    name: 'category',
    modules: {},
};

/**
 * Prepares a bundle configuration for all modules loaded on category page.
 *
 * @param {BrowserContext} browserContext Puppeteer's BrowserContext object.
 * @param {object} configuration Generation configuration object.
 * @param {string} configuration.categoryUrl URL to the category page.
 * @param {string} configuration.authUsername Basic auth username.
 * @param {string} configuration.authPassword Basic auth password.
 */
const category = async (
    browserContext,
    { categoryUrl, authUsername, authPassword }
) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.info(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();

    blockMagepack(page);

    await authenticate(page, authUsername, authPassword);

    await page.goto(categoryUrl, {
        waitUntil: 'networkidle0',
    });

    merge(bundleConfig.modules, await collectModules(page));

    await page.close();

    logger.success(`Finished collecting modules for bundle "${bundleName}".`);

    return bundleConfig;
};

module.exports = category;
