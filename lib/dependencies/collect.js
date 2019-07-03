module.exports = (page, excludeRegExp = /^\./) =>
    page
        .evaluate(
            () =>
                new Promise(resolve => {
                    require(['rjsResolver'], resolver =>
                        resolver(() => {
                            const dependencies = Object.keys(
                                // eslint-disable-next-line no-undef
                                window.require.s.contexts._.defined
                            ).filter(
                                dependency =>
                                    dependency.indexOf('mixins!') === -1 &&
                                    dependency.indexOf('text!') === -1 &&
                                    dependency !== 'text' &&
                                    dependency !== 'mage/gallery/gallery'
                            );

                            resolve(dependencies);
                        }));
                })
        )
        .then(dependencies =>
            dependencies.filter(dependency => !dependency.match(excludeRegExp))
        );
