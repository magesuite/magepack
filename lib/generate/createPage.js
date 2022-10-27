const blockMagepack = require('./blockMagepack');
const logger = require('../utils/logger');

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

    if (authUsername && authPassword) {
        logger.debug('Authenticating with given user and password.');

        await page.authenticate({ authUsername, authPassword });
    }

    if (url) {
        const result = await page.goto(url, { waitUntil: 'networkidle0' });

        if (url !== result.url()) {
            logger.info(
                'Requested',
                url,
                'but navigation ended on',
                result.url()
            );
        }

        if (!result.ok()) {
            throw new Error(
                'HTTP status code ' +
                    result.status() +
                    ' returned from ' +
                    result.url()
            );
        }
    }

    return page;
};
