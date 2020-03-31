const path = require('path');

const stripPlugin = require('../utils/stripPlugin');

const getBundlePath = (localePath, bundleName) =>
    path.join(localePath, 'magepack', `bundle-${bundleName}.min.js`);

const getBundleConfigPath = (localePath, bundleName) =>
    path.join(localePath, 'magepack', `requirejs-config-${bundleName}.min.js`);

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
