/* eslint-disable no-undef */
module.exports = async (page, excludeRegExp = /^\./) => {
    const criticalModules = new Set();

    page.on('console', async msg => {
        if (msg.type() !== 'debug' || !msg.text().startsWith('__CRITICAL')) {
            return;
        }

        const definedModules = JSON.parse(await msg.args()[1].jsonValue());
        definedModules.forEach(module => criticalModules.add(module));
    });

    await page.evaluate(() => {
        const getDefinedModules = () => {
            if (typeof window.requirejs === 'function') {
                const mixins = window.require.s.contexts._.config.config.mixins;
                return Object.keys(window.require.s.contexts._.defined).filter(
                    dependency =>
                        (dependency === 'jquery' || !mixins[dependency]) &&
                        !dependency.includes('mixins!') &&
                        !['prototype', 'text', 'mage/gallery/gallery'].includes(
                            dependency
                        )
                );
            }

            return [];
        };

        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const isInViewport = element => {
            const rect = element.getBoundingClientRect();

            if (!rect.width && !rect.height) {
                return false;
            }

            const vertInView =
                rect.top <= windowHeight && rect.top + rect.height >= 0;
            const horInView =
                rect.left <= windowWidth && rect.left + rect.width >= 0;

            return vertInView && horInView;
        };

        const observer = new MutationObserver(function(mutationList) {
            mutationList.forEach(mutation => {
                const element =
                    mutation.type !== 'characterData'
                        ? mutation.target
                        : mutation.target.parentNode;
                if (isInViewport(element)) {
                    console.debug(
                        '__CRITICAL',
                        JSON.stringify(getDefinedModules())
                    );
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
        });
    });

    console.log('Waiting for require to appear...');

    await page.waitForFunction(() => {
        return window.require;
    });

    console.log('Done, RequireJS loaded.');

    console.log('Waiting for modules to load...');

    await page.evaluate(
        () =>
            new Promise(resolve => {
                require(['rjsResolver'], resolver => {
                    resolver(() => resolve());
                });
            })
    );

    console.log('Modules loaded.');

    console.log('Waiting for browser to be idle...');

    await page.evaluate(
        () =>
            new Promise(resolve => {
                requestIdleCallback(resolve);
            })
    );

    console.log('Done, browser idle.');

    return Array.from(criticalModules)
        .sort()
        .filter(dependency => !dependency.match(excludeRegExp));
};
