const merge = require('lodash.merge');
const collectDependencies = require('../dependencies/collect');

const baseConfig = {
    url: '',
    module: {
        name: 'bundles/category',
        create: true,
        exclude: ['requirejs/require', 'prototype', 'legacy-build.min'],
    },
};

module.exports = async (browser, config) => {
    config = merge({}, baseConfig, config);

    console.log(`[${config.module.name}] Collecting dependencies...`);

    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.goto(config.url, { waitUntil: 'domcontentloaded' });

    const include = await collectDependencies(page, config.excludeRegExp);

    page.close();

    console.log(`[${config.module.name}] Done.`);

    return merge({}, config.module, { include });
};
