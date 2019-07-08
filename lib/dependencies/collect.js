/* eslint-disable no-undef */
module.exports = (page, excludeRegExp = /^\./) =>
    page
        .evaluate(
            () =>
                new Promise(resolve => {
                    require(['rjsResolver'], resolver =>
                        resolver(() => {
                            const mixins =
                                window.require.s.contexts._.config.config
                                    .mixins;
                            const dependencies = Object.keys(
                                window.require.s.contexts._.defined
                            ).filter(
                                dependency =>
                                    (dependency === 'jquery' ||
                                        !mixins[dependency]) &&
                                    dependency.indexOf('mixins!') === -1 &&
                                    dependency.indexOf('text!') === -1 &&
                                    !['text', 'mage/gallery/gallery'].includes(
                                        dependency
                                    )
                            );

                            resolve(dependencies);
                        }));
                })
        )
        .then(dependencies =>
            dependencies.filter(dependency => !dependency.match(excludeRegExp))
        );
