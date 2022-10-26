const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const { waitForBrowserCollector } = require('../browserCollector');
const createPage = require('../createPage');
const orderModules = require('../orderModules');

const baseConfig = {
    url: '',
    name: 'cms',
    modules: {},
};

/**
 * Prepares a bundle configuration for all modules loaded on CMS pages.
 *
 * @param {BrowserContext} browserContext Puppeteer's BrowserContext object.
 * @param {object} configuration Generation configuration object.
 * @param {string} configuration.cmsUrl URL to the CMS page.
 * @param {string} configuration.authUsername Basic auth username.
 * @param {string} configuration.authPassword Basic auth password.
 */
const cms = async (browserContext, { cmsUrl, authUsername, authPassword }) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.info(`Collecting modules for bundle "${bundleName}".`);

    const page = await createPage(browserContext, authUsername, authPassword);

    await page.goto(cmsUrl, { waitUntil: 'networkidle0' });

    const { modules, dependencies } = await waitForBrowserCollector(page);

    merge(bundleConfig.modules, orderModules(modules, dependencies));

    await page.close();

    logger.success(`Finished collecting modules for bundle "${bundleName}".`);

    return bundleConfig;
};

module.exports = cms;
