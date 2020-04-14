const puppeteer = require('puppeteer');
const { stringify } = require('javascript-stringify');
const fs = require('fs');
const path = require('path');

const logger = require('./utils/logger');
const collectors = require('./generate/collector');
const extractCommonBundle = require('./generate/extractCommonBundle');

module.exports = async (generationConfig) => {
    const browser = await puppeteer.launch({
        headless: !generationConfig.debug,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
        defaultViewport: { width: 412, height: 732 },
        ignoreHTTPSErrors: true,
    });
    const browserContext = await browser.createIncognitoBrowserContext();

    logger.info('Collecting bundle modules in the browser.');

    let bundles = [];
    for (const collectorName in collectors) {
        bundles.push(
            await collectors[collectorName](browserContext, generationConfig)
        );
    }

    logger.debug('Finished, closing the browser.');

    await browser.close();

    logger.debug('Extracting common module...');

    bundles = extractCommonBundle(bundles);

    logger.success('Done, outputting following modules:');

    bundles.forEach((bundle) => {
        logger.success(
            `${bundle.name} - ${Object.keys(bundle.modules).length} items.`
        );
    });

    fs.writeFileSync(
        path.resolve('magepack.config.js'),
        `module.exports = ${stringify(bundles, null, '  ')}`
    );
};
