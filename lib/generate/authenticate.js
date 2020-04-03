const logger = require('../utils/logger');

/**
 *
 * @param {Page} page Puppeteer Page object instance.
 * @param {string} username Basic auth username.
 * @param {string} password Basic auth password.
 */
const authenticate = async (page, username, password) => {
    if (username && password) {
        logger.debug('Authenticating with given user and password.');

        await page.authenticate({
            username,
            password,
        });
    }
};

module.exports = authenticate;
