module.exports = modules => {
    if (module.length <= 1) {
        return modules;
    }

    const commonDependencies = new Set(modules[0].include);

    // Find the list of common dependencies.
    modules.forEach(({ include }) => {
        include.forEach(dependency => {
            if (!commonDependencies.has(dependency)) {
                commonDependencies.delete(dependency);
            }
        });
    });
    // Remove common dependencies from each module, because they will be extracted.
    modules = modules.map(module => {
        module.include = module.include.filter(
            dependency => !commonDependencies.has(dependency)
        );

        return module;
    });

    modules.unshift({
        name: 'requirejs/require',
        create: false,
        include: Array.from(commonDependencies),
        exclude: [],
    });

    return modules;
};
