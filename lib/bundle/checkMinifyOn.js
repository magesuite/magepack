const fs = require('fs');
const path = require('path');

/**
 * Tells if minification is enabled in Magento.
 *
 * @param {string[]} localesPaths List of paths to locales.
 * @returns {boolean}
 */
const checkMinifyOn = (localesPaths) =>
    Boolean(localesPaths[0]) &&
    fs.existsSync(path.join(localesPaths[0], 'requirejs-config.min.js'));

module.exports = checkMinifyOn;
