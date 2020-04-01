/* global window, requestIdleCallback */

const excludedModules = require('./excludedModules');

/**
 * Collects all defined RequireJS modules on a given page.
 */
module.exports = async (page) => {
    /**
     * Wait to make sure RequireJS is loaded.
     */
    await page.waitForFunction(() => {
        return window.require;
    });

    /**
     * Use Magento's rjsResolver to wait for all modules to load.
     */
    await page.evaluate(
        () =>
            new Promise((resolve) => {
                require(['rjsResolver'], (resolver) => {
                    resolver(() => resolve());
                });
            })
    );

    /**
     * Wait for browser to be idle for a good measure.
     */
    await page.evaluate(
        () =>
            new Promise((resolve) => {
                requestIdleCallback(resolve);
            })
    );

    /**
     * Wait another 5s for a good measure.
     */
    await page.waitFor(5000);

    const modules = await page.evaluate((excludedModules) => {
        const stripPlugin = (moduleName) => moduleName.replace(/^[^!].+!/, '');

        const baseUrlLength = require.toUrl('').length;

        const contexts = require.s.contexts;
        const defContext = contexts._;
        const defaultContextConfig = defContext.config;
        const unbundledContextConfig = {
            baseUrl: defaultContextConfig.baseUrl,
            paths: defaultContextConfig.paths,
            shim: defaultContextConfig.shim,
            config: defaultContextConfig.config,
            map: defaultContextConfig.map,
        };
        const unbundledContext = require.s.newContext('magepack');

        /**
         * Prepare a separate context where modules are not assigned to bundles.
         * This make it possible to fetch real module paths even with bundling enabled.
         */
        unbundledContext.configure(unbundledContextConfig);

        const modules = {};
        Object.keys(window.require.s.contexts._.defined)
            .sort()
            .forEach((moduleName) => {
                /**
                 * Ignore all modules that are loaded with plugins other then text.
                 */
                if (
                    moduleName.includes('!') &&
                    !moduleName.startsWith('text!')
                ) {
                    return;
                }

                /**
                 * Ignore excluded modules.
                 */
                if (excludedModules.includes(moduleName)) {
                    return;
                }

                /**
                 * Get module path inside locale directory.
                 */
                const modulePath = unbundledContext.require
                    .toUrl(stripPlugin(moduleName))
                    .slice(baseUrlLength);

                modules[moduleName] = modulePath;
            });

        return modules;
    }, excludedModules);

    return modules;
};
