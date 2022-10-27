const authenticate = require('./authenticate');
const blockMagepack = require('./blockMagepack');

/**
 * Set up a page to be ready to collect data
 *
 * @param {import('puppeteer').BrowserContext} browserContext Puppeteer browser context instance
 * @param {string} authUsername Basic auth username
 * @param {string} authPassword Basic auth password
 * @param {string} url URL of page to navigate to initially
 */
module.exports = async (browserContext, authUsername, authPassword, url) => {
    const page = await browserContext.newPage();

    blockMagepack(page);

    await authenticate(authUsername, authPassword);

    if (url) {
        await page.goto(url, { waitUntil: 'networkidle0' });
    }

    return page;
};
