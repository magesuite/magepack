const logger = require('../utils/logger');

/**
 * @param {Page} page Puppeteer Page object instance.
 */
const blockMagepack = (page) => {
    page.setRequestInterception(true);
    page.on('request', (request) => {
        const url = request.url();

        // If we let these resources load, 'magepack generate' hangs at rjsResolver step.
        if (url.match(/magepack\/requirejs-config-.*\.js$/)) {
            logger.info('Blocked resource: ' + url);
            request.abort();
            return;
        }

        request.continue();
    });
};

module.exports = blockMagepack;
