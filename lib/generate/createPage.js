const authenticate = require('./authenticate');
const blockMagepack = require('./blockMagepack');
const { setupBrowserCollector } = require('./browserCollector');

/**
 * Set up a page to be ready to collect data
 *
 * @param {import('puppeteer').BrowserContext} browserContext Puppeteer browser context instance
 * @param {string} authUsername Basic auth username
 * @param {string} authPassword Basic auth password
 */
module.exports = async (browserContext, authUsername, authPassword) => {
    const page = await browserContext.newPage();
    blockMagepack(page);
    setupBrowserCollector(page);
    await authenticate(page, authUsername, authPassword);
    return page;
};
