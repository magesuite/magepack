const merge = require('lodash.merge');
const collectDependencies = require('../dependencies/collect');

const baseConfig = {
    url: [],
    module: {
        name: 'bundles/pdp',
        create: true,
        exclude: ['requirejs/require'],
    },
};

module.exports = async (browser, config) => {
    config = merge({}, baseConfig, config);

    console.log(`[${config.module.name}] Collecting dependencies...`);

    const allDependencies = await Promise.all(
        config.url.map(async url => {
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle0' });

            const dependencies = await collectDependencies(
                page,
                config.excludeRegExp
            );

            return dependencies;
        })
    );

    const includeSet = allDependencies.reduce(
        (dependenciesSet, dependencies) => {
            dependencies.forEach(dependency => dependenciesSet.add(dependency));

            return dependenciesSet;
        },
        new Set()
    );
    const include = Array.from(includeSet);

    console.log(`[${config.module.name}] Done.`);

    return merge({}, config.module, { include });
};
