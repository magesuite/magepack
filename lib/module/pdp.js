const merge = require('lodash.merge');
const collectDependencies = require('../dependencies/collect');

const baseConfig = {
    url: [],
    module: {
        name: 'bundles/pdp',
        create: true,
        exclude: ['requirejs/require', 'prototype', 'legacy-build.min'],
    },
};

module.exports = async (browser, config) => {
    config = merge({}, baseConfig, config);

    console.log(`[${config.module.name}] Collecting dependencies...`);

    const includeSet = new Set();

    for (const url of config.url) {
        const page = await browser.newPage();

        await page.setCacheEnabled(false);
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const dependencies = await collectDependencies(
            page,
            config.excludeRegExp
        );
        dependencies.forEach(dependency => includeSet.add(dependency));
    }

    const include = Array.from(includeSet);

    console.log(`[${config.module.name}] Done.`);

    return merge({}, config.module, { include });
};
