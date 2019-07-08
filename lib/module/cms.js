const merge = require('lodash.merge');
const collectDependencies = require('../dependencies/collect');

const baseConfig = {
    url: '',
    module: {
        name: 'bundles/cms',
        create: true,
        exclude: ['requirejs/require'],
    },
};

module.exports = async (browser, config) => {
    config = merge({}, baseConfig, config);

    console.log(`[${config.module.name}] Collecting dependencies...`);

    const page = await browser.newPage();

    await page.setCacheEnabled(false);
    await page.goto(config.url, { waitUntil: 'networkidle0' });

    const include = await collectDependencies(page, config.excludeRegExp);

    page.close();

    console.log(`[${config.module.name}] Done.`);

    return merge({}, config.module, { include });
};
