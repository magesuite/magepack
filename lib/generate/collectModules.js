const excludedModules = require('./excludedModules');
const logger = require('../utils/logger');
const path = require('path');

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
                    unbundledContext.require.toUrl(stripPlugin(moduleName))
                );
            }
        );

        return modules;
    }, excludedModules);

    // Calculate dependencies of each module
    const dependencyMap = new Map();
    for (const moduleName in modules) {
        if (moduleName.includes('!')) {
            // This module has no dependencies
            dependencyMap.set(moduleName, {});
            continue;
        }

        // Load this module anew to track its dependencies
        const dependencies = await page.evaluate((moduleName) => {
            window.define = function (name, dependencies) {
                if (typeof name !== 'string') {
                    dependencies = name;
                }

                if (Array.isArray(dependencies)) {
                    window.magepack_dependencies = dependencies;
                }
            };

            return new Promise((resolve) => {
                // Forget this module, so it gets loaded anew
                require.undef(moduleName);

                // Global state isn't nice. Alternate suggestions are welcome.
                window.magepack_dependencies = [];

                // A new context means no mixins get in the way
                const localContext = require.s.newContext();
                localContext.configure(
                    Object.assign({}, require.s.contexts._.config, {
                        bundles: {},
                    })
                );

                // Load this module so we can track its dependencies
                localContext.require([moduleName], resolve, resolve);
            }).then(() => window.magepack_dependencies);
        }, moduleName);

        const dependencyObject = {};
        dependencies.forEach((dependency) => {
            if (dependency.startsWith('./') || dependency.startsWith('../')) {
                dependency = path.join(moduleName, '..', dependency);
            }

            if (!modules[dependency]) {
                // We don't need to track this dependency as it's not in this bundle
                return;
            }

            if (dependency == moduleName) {
                // Some modules (eg, jquery) seem to list themselves as a dependency
                return;
            }

            dependencyObject[dependency] = true;
        });

        dependencyMap.set(moduleName, dependencyObject);
    }

    const orderedModules = {};
    let level = 0;
    // Transfer 'dependencyMap' to 'orderedModules'
    while (dependencyMap.size) {
        if (level++ > 999) {
            logger.warn(
                'Unable to determine consistent module order. Falling back to known-working order (which might be different from the last time this ran).'
            );
            return modules;
        }

        const modulesAtThisLevel = [];
        for (const [moduleName, dependencies] of dependencyMap) {
            if (Object.keys(dependencies).length) {
                // This module has dependencies, so belongs at another level
                continue;
            }

            modulesAtThisLevel.push(moduleName);
            dependencyMap.delete(moduleName);
        }

        if (!modulesAtThisLevel.length) {
            // Something went wrong. This list shouldn't be empty.
            // Try to break known-circular dependencies..
            ['jquery', 'mage/mage'].forEach((moduleName) => {
                if (dependencyMap.has(moduleName)) {
                    modulesAtThisLevel.push(moduleName);
                }
            });
        }

        modulesAtThisLevel.sort();

        for (const moduleName of modulesAtThisLevel) {
            orderedModules[moduleName] = modules[moduleName];

            for (const dependencies of dependencyMap.values()) {
                delete dependencies[moduleName];
            }
        }
    }

    return orderedModules;
};
