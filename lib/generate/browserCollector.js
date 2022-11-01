const stripPlugin = require('../utils/stripPlugin');
const excludedModules = require('./excludedModules');

/**
 * Take a require module object and convert it to a name that can be used to
 * reference it in the bundle. Returns undefined if the module should not be
 * bundled.
 */
const getModuleName = (module, allowPlugins) => {
    let moduleName;

    if (module.unnormalized) {
        // Plugin loading - normalise the dependency name
        moduleName = module.prefix + '!' + module.name;
    } else {
        moduleName = module.id;
    }

    // Ignore all modules loaded by URL
    if (moduleName.match(/^(https?:)?\/\//)) {
        return;
    }

    // Ignore all modules that are loaded with plugins other than text.
    if (moduleName.includes('!') && !moduleName.startsWith('text!')) {
        if (allowPlugins !== true) {
            return;
        }

        moduleName = stripPlugin(moduleName);
    }

    // Ignore excluded modules
    if (excludedModules.includes(moduleName)) {
        return;
    }

    return moduleName;
};

/**
 * Add a listener to the frame which will update the default requirejs config
 * with a callback function. The callback function will be called immediately on
 * requirejs being loaded, allowing us to attach a listener to onResourceLoad
 * immediately and always capture everything loaded. By using "mutation" as the
 * polling method, we can intercept the window.require object after it is output
 * to the page and parsed by the browser, but before requirejs has loaded.
 *
 * The listener will build two global objects - tree and paths - tree being a
 * list of all dependencies keyed by module and paths being a list of real paths
 * for each defined name.
 *
 * After resources are loaded (defined as being 5 seconds after the final load
 * event fires), set window global modulesLoaded to true so that the collectors
 * can process the data.
 *
 * @param {import('puppeteer').Frame} frame
 */
const addListener = (frame) => {
    return frame.waitForFunction(
        () => {
            if (typeof window.require !== 'object') {
                return false;
            }

            let modulesLoadedTimer;
            window.modulesLoaded = false;
            window.tree = {};
            window.paths = {};

            require.callback = () => {
                function extractBaseUrl(require) {
                    const baseUrl = require.toUrl('');
                    return baseUrl.replace(
                        /\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/$/,
                        '/'
                    );
                }

                function stripBaseUrl(baseUrl, moduleUrl) {
                    if (!moduleUrl.startsWith(baseUrl)) {
                        return moduleUrl;
                    }

                    return moduleUrl
                        .substring(baseUrl.length)
                        .replace(/^[^/]+\/[^/]+\/[^/]+\/[^/]+\//, '');
                }

                const baseUrl = extractBaseUrl(require);

                /**
                 * Prepare a separate context where modules are not assigned to bundles.
                 * This make it possible to fetch real module paths even with bundling enabled.
                 */
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
                unbundledContext.configure(unbundledContextConfig);

                require.onResourceLoad = async (context, map, depArray) => {
                    // Modules are defined as being loaded 5 seconds after the
                    // final resourceLoad event is fired. Immediately set the
                    // loaded state to false and then set up a timer.
                    window.modulesLoaded = false;
                    if (modulesLoadedTimer) {
                        // Delete the existing timer
                        window.clearTimeout(modulesLoadedTimer);
                    }
                    window.modulesLoadedTimer = window.setTimeout(() => {
                        window.modulesLoaded = true;
                    }, 5000);
                    // TODO: is there a queue we can check instead? This seems
                    // too hackish to be consistent on all hardware / networks
                    // e.g.: checkout, are we still waiting on estimate shipping

                    // build up proper normalized moduleID dependency tree
                    const moduleName = await getModuleName(map);
                    if (!moduleName) {
                        return;
                    }

                    var deps = [];
                    for (var i = 0; i < depArray.length; i++) {
                        const depName = await getModuleName(depArray[i], true);
                        if (depName) {
                            deps.push(depName);
                        }
                    }

                    // Convert the array into an object, with the keys being
                    // deps and the value being "true". This is useful later on
                    // when tracking dependency loading order.
                    window.tree[moduleName] = Object.fromEntries(
                        deps.map((dep) => [dep, true])
                    );

                    /**
                     * Get module path from resolved url
                     */
                    window.paths[moduleName] = stripBaseUrl(
                        baseUrl,
                        unbundledContext.require.toUrl(
                            await stripPlugin(moduleName)
                        )
                    );
                };
            };
            return true;
        },
        { polling: 'mutation' }
    );
};

/**
 * Add an event to a Page which triggers our collector function to be added
 * whenever that page navigates to a new URL.
 *
 * Should be run before first navigation, any time a new page is created.
 *
 * @param {import('puppeteer').Page} page
 */
const setupBrowserCollector = async (page) => {
    await page.exposeFunction('stripPlugin', stripPlugin);
    await page.exposeFunction('getModuleName', getModuleName);
    page.on('framenavigated', async (frame) => {
        if (frame.parentFrame() !== null) {
            return;
        }
        if (await page.evaluate(() => typeof window.tree === 'object')) {
            // We've already added our listener, probably a hashchange happened
            return;
        }
        await addListener(frame);
    });
};

const waitForBrowserCollector = async (page) => {
    await page.waitForFunction(() => window.modulesLoaded === true);
    return await page.evaluate(() => ({
        modules: window.paths,
        dependencies: window.tree,
    }));
};

module.exports = { setupBrowserCollector, waitForBrowserCollector };
