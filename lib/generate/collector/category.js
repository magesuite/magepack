const merge = require('lodash.merge');

const logger = require('../../utils/logger');
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
 */
const category = async (browserContext, { categoryUrl }) => {
    const bungleConfig = merge({}, baseConfig);

    const bundleName = bungleConfig.name;

    logger.info(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();
    await page.goto(categoryUrl, {
        waitUntil: 'networkidle0',
    });

    merge(bungleConfig.modules, await collectModules(page));

    page.close();

    logger.success(`Finished collecting modules for bundle "${bundleName}".`);

    return bungleConfig;
};

module.exports = category;
