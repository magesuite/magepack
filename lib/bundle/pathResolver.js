const path = require('path');

const stripPlugin = require('../utils/stripPlugin');

/**
 * Returns final absolute file path for given bundle.
 *
 * @param {string} localePath Path to the locale.
 * @param {string} bundleName Name of the bundle.
 * @returns {string}
 */
const getBundlePath = (localePath, bundleName) =>
    path.join(localePath, 'magepack', `bundle-${bundleName}.min.js`);

/**
 * Returns final absolute file path for given bundle configuration.
 *
 * @param {string} localePath Path to the locale.
 * @param {string} bundleName Name of the bundle.
 * @returns {string}
 */
const getBundleConfigPath = (localePath, bundleName) =>
    path.join(localePath, 'magepack', `requirejs-config-${bundleName}.min.js`);

/**
 * Returns final module file path by stripping the plugin and adding minification suffix if needed.
 *
 * @param {string} moduleName Module name.
 * @param {string} modulePath Module path.
 * @param {boolean} isMinifyOn If minification is enabled in Magento.
 */
const getModuleRealPath = (moduleName, modulePath, isMinifyOn) => {
    if (!moduleName.startsWith('text!')) {
        if (!modulePath.endsWith('.min')) {
            modulePath += isMinifyOn && '.min';
        }

        modulePath += '.js';
    }

    return stripPlugin(modulePath);
};

module.exports = { getBundlePath, getBundleConfigPath, getModuleRealPath };
