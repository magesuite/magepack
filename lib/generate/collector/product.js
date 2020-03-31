const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const collectModules = require('../collectModules');

const baseConfig = {
    url: [],
    name: 'product',
    modules: {},
};

module.exports = async (browserContext, { productUrl }) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.debug(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();
    await page.goto(productUrl, { waitUntil: 'networkidle0' });

    merge(bundleConfig.modules, await collectModules(page));

    page.close();

    logger.debug(`Finished collecting modules for bundle "${bundleName}".`);

    return bundleConfig;
};
