const logger = require('../utils/logger');

/**
 * Given a list of modules and their dependencies, return list in a consistent
 * order, whilst still ensuring dependencies are loaded before their dependant
 * modules.
 */
module.exports = (modules, dependencies) => {
    // First we set up a map with the existing dependencies. These are obtained
    // by listening to requirejs onResourceLoad event, so are in a working but
    // non-deterministic order, based on browser response times.
    const dependencyMap = new Map(Object.entries(dependencies));

    // We then set up a new `orderedModules` object and transfer `dependencyMap`
    // to it, adding modules in a consistent order. Objects are moved out of
    // dependency map, so we loop until it has 0 length, bailing if it seems
    // like we're unable to proceed.
    const orderedModules = {};
    let level = 0;
    while (dependencyMap.size) {
        if (level++ > 999) {
            logger.warn(
                'Unable to determine consistent module order. Falling back to known-working order (which might be different from the last time this ran).'
            );
            logger.debug(modules, dependencies, dependencyMap);
            return modules;
        }

        const modulesAtThisLevel = [];
        for (const [moduleName, dependencies] of dependencyMap) {
            // Object.keys(dependencies) is a list of the dependencies for
            // moduleName which have not yet been added to orderedModules. After
            // we add a module to orderedModules, we remove it from the map, and
            // we also remove it from the dependency list of all other modules.
            if (Object.keys(dependencies).length) {
                // Therefore, any dependencies for the module have not yet been
                // added to the list and so we should defer adding this module
                // to a later loop iteration
                continue;
            }

            // Otherwise, take this module for processing in this iteration
            modulesAtThisLevel.push(moduleName);
            dependencyMap.delete(moduleName);
        }

        // Sort this level's modules by name
        modulesAtThisLevel.sort();

        // Remove all of this level's from the dependencies of remaining modules
        for (const moduleName of modulesAtThisLevel) {
            orderedModules[moduleName] = modules[moduleName];

            for (const dependencies of dependencyMap.values()) {
                delete dependencies[moduleName];
            }
        }
    }

    logger.debug(
        `Successfully ordered modules with ${level} iterations`,
        orderedModules
    );

    return orderedModules;
};
