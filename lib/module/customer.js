const merge = require('lodash.merge');
const collectDependencies = require('../dependencies/collect');

const baseConfig = {
    url: '',
    email: '',
    password: '',
    module: {
        name: 'bundles/customer',
        create: true,
        exclude: ['requirejs/require'],
    },
};

module.exports = async (browser, config) => {
    config = merge({}, baseConfig, config);

    console.log(`[${config.module.name}] Collecting dependencies...`);

    const page = await browser.newPage();

    await page.goto(config.url, { waitUntil: 'networkidle0' });

    await page.type('#email', config.email);
    await page.type('#pass', config.password);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('#send2'),
    ]);

    if (page.url().indexOf(config.url) !== -1) {
        throw new Error('Invalid login credentials provided!');
    }

    const include = await collectDependencies(page, config.excludeRegExp);

    page.close();

    console.log(`[${config.module.name}] Done.`);

    return merge({}, config.module, { include });
};
