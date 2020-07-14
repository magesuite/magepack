const path = require('path');
const fs = require('fs');

function defaultModulePath(themePath, modulePath) {
    return path.join(themePath, modulePath);
}

function mappedModulePath(themePath, modulePath, map) {
    if (!map[modulePath]) {
        return defaultModulePath(themePath, modulePath);
    }

    return path.join(themePath, map[modulePath], modulePath);
}

module.exports = function (themePath, isMinified) {
    const bundleMapFile = path.join(
        themePath,
        'requirejs-map.' + (isMinified ? 'min.' : '') + 'js'
    );

    if (fs.existsSync(bundleMapFile)) {
        const map = new Function(
            'require',
            'return ' + fs.readFileSync(bundleMapFile)
        )({
            config: (config) => {
                if (config.config && config.config.baseUrlInterceptor) {
                    return config.config.baseUrlInterceptor;
                }

                return {};
            },
            map: {},
        });
        return function (modulePath) {
            return mappedModulePath(themePath, modulePath, map);
        };
    }

    return function (modulePath) {
        return defaultModulePath(themePath, modulePath);
    };
};
