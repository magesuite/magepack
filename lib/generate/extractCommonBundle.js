/**
 * Tells if given module is present in all given bundles except the checkout one.
 *
 * @param {object[]} bundles List of all bundles.
 * @param {string} moduleName Module name to check.
 */
const isCommonModule = (bundles, moduleName) =>
    !bundles.some(
        (bundle) =>
            !['checkout'].includes(bundle.name) && !bundle.modules[moduleName]
    );

/**
 * Extract common modules from given bundles to a separate one that will be loaded on every page.
 * @param {object[]} bundles List of all collected bundles.
 */
const extractCommonBundle = (bundles) => {
    if (bundles.length <= 1) {
        return bundles;
    }

    const commonModules = {};

    /**
     * Add modules that are in every bundle to commons.
     */
    bundles.forEach((bundle) => {
        Object.keys(bundle.modules).forEach((moduleName) => {
            if (isCommonModule(bundles, moduleName)) {
                commonModules[moduleName] = bundle.modules[moduleName];
                delete bundle.modules[moduleName];
            }
        });
    });

    /**
     * Remove commons modules from every bundle.
     */
    Object.keys(commonModules).forEach((moduleName) => {
        bundles.forEach((bundle) => {
            delete bundle.modules[moduleName];
        });
    });

    bundles.unshift({
        name: 'common',
        modules: commonModules,
    });

    return bundles;
};

module.exports = extractCommonBundle;
