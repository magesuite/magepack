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
        function extractBaseUrl(require) {
            const baseUrl = require.toUrl('');
            return baseUrl.replace(/\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/$/, '/');
        }

        function stripBaseUrl(baseUrl, moduleUrl) {
            if (!moduleUrl.startsWith(baseUrl)) {
                return moduleUrl;
            }

            return moduleUrl
                .substring(baseUrl.length)
                .replace(/^[^/]+\/[^/]+\/[^/]+\/[^/]+\//, '');
        }

        const stripPlugin = (moduleName) => moduleName.replace(/^[^!].+!/, '');

        const baseUrl = extractBaseUrl(require);

        const modules = {};
        Object.keys(window.require.s.contexts._.defined).forEach(
            (moduleName) => {
                /**
                 * Ignore all modules that are loaded with plugins other than text.
                 */
                if (
                    (moduleName.includes('!') &&
                        !moduleName.startsWith('text!')) ||
                    moduleName.match(/^(https?:)?\/\//)
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
                 * Get module path from resolved url
                 */
                modules[moduleName] = stripBaseUrl(
                    baseUrl,
                    require.toUrl(stripPlugin(moduleName))
                );
            }
        );

        return modules;
    }, excludedModules);

    return modules;
};
