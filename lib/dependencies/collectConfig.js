/* eslint-disable no-undef */
module.exports = async (browser, { url }) => {
    const page = await browser.newPage();
    await page.goto(url);

    const config = await page.evaluate(() => {
        return new Promise(resolve => {
            require(['rjsResolver'], resolver =>
                resolver(() => {
                    ({
                        deps,
                        shim,
                        paths,
                        map,
                    } = window.require.s.contexts._.config);

                    Object.keys(paths).forEach(module => {
                        const path = paths[module];
                        if (
                            path.indexOf('http://') !== -1 ||
                            path.indexOf('https://') !== -1 ||
                            path.indexOf('//') !== -1
                        ) {
                            paths[module] = 'empty:';
                        }
                    });

                    Object.keys(shim).forEach(module => {
                        delete shim[module].exportsFn;
                    });

                    resolve({
                        deps,
                        shim,
                        paths,
                        map,
                    });
                }));
        });
    });

    page.close();

    return config;
};
