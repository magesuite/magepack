const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const collectModules = require('../collectModules');

const baseConfig = {
    url: '',
    name: 'category',
    modules: {},
};

module.exports = async (browserContext, { categoryUrl }) => {
    const bungleConfig = merge({}, baseConfig);

    const bundleName = bungleConfig.name;

    logger.debug(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();
    await page.goto(categoryUrl, {
        waitUntil: 'networkidle0',
    });

    merge(bungleConfig.modules, await collectModules(page));

    page.close();

    logger.debug(`Finished collecting modules for bundle "${bundleName}".`);

    return bungleConfig;
};
