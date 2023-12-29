const merge = require(`lodash.merge`);

const logger = require(`../../utils/logger`);
const authenticate = require(`../authenticate`);
const blockMagepack = require(`../blockMagepack`);
const collectModules = require(`../collectModules`);

const baseConfig = {
    url: [],
    name: `product`,
    modules: {},
};

/**
 * Prepares a bundle configuration for all modules loaded on product pages.
 *
 * @param {BrowserContext} browserContext Puppeteer`s BrowserContext object.
 * @param {object} configuration Generation configuration object.
 * @param {string} configuration.productUrl URL to the product page.
 * @param {string} configuration.authUsername Basic auth username.
 * @param {string} configuration.authPassword Basic auth password.
 */
const product = async (
    browserContext,
    { productUrl, authUsername, authPassword }
) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    console.log(bundleName); // Check the value of bundleName
    console.log(`Collecting modules for bundle ${bundleName}`);
    logger.info(`Collecting modules for bundle ${bundleName}`);

    const page = await browserContext.newPage();

    page.on(`request`, (request) => {
        // Check if request.url() is a function and call it to get the URL
        const requestUrl = typeof request.url === 'function' ? request.url() : request.url;
        console.log(request.url()); // Check the value of request.url
        console.log(`Request initiated: ${request.url()}`);
    });

    page.on(`response`, (response) => {
        console.log(response.url()); // Check the value of response.url
        console.log(`Response received: ${response.url()}`);
    });

    blockMagepack(page);

    await authenticate(page, authUsername, authPassword);

    console.log(productUrl); // Check the value of productUrl
    console.log(`Navigating to ${productUrl}...`);
    await page.goto(productUrl, { waitUntil: `networkidle0` });

    console.log(`Collecting modules...`);
    merge(bundleConfig.modules, await collectModules(page));

    console.log(`Merge complete. Closing page`);
    await page.close();

    logger.success(`Finished collecting modules for bundle ${bundleName}`);

    console.log(`Finished collecting modules for bundle ${bundleName}`);

    return bundleConfig;
};

module.exports = product;
