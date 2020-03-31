const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const collectModules = require('../collectModules');

const baseConfig = {
    url: '',
    name: 'cms',
    modules: {},
};

module.exports = async (browserContext, { cmsUrl }) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.debug(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();
    await page.goto(cmsUrl, { waitUntil: 'networkidle0' });

    merge(bundleConfig.modules, await collectModules(page));

    page.close();

    logger.debug(`Finished collecting modules for bundle "${bundleName}".`);

    return bundleConfig;
};
