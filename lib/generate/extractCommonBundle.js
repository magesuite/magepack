const isCommonModule = (bundles, moduleName) =>
    !bundles.some(
        (bundle) => bundle.name !== 'checkout' && !bundle.modules[moduleName]
    );

module.exports = (bundles) => {
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
