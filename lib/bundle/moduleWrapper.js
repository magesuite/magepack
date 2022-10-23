const jsesc = require('jsesc');

/**
 * Tells if given module is a non-AMD JavaScript code.
 *
 * @param {string} moduleContents Contents of the module.
 */
const isNonAmd = (moduleContents) => !moduleContents.match(/define\s*\(/m);

/**
 * Wraps non-AMD module so it can be safely inlined into the bundle.
 *
 * @param {string} moduleName Name of the AMD module.
 * @param {string} content Contents of the module to wrap.
 * @returns {string}
 */
const wrapNonAmd = (moduleName, content) => {
    return `define('${moduleName}', (require.s.contexts._.config.shim['${moduleName}'] && require.s.contexts._.config.shim['${moduleName}'].deps || []), function() {

    ${content}

    return (require.s.contexts._.config.shim['${moduleName}'] && require.s.contexts._.config.shim['${moduleName}'].exportsFn && require.s.contexts._.config.shim['${moduleName}'].exportsFn());
}.bind(window));`;
};

/**
 * Tells if given module is a text type.
 *
 * @param {string} modulePath Module path.
 */
const isText = (modulePath) => !modulePath.endsWith('.js');

/**
 * Wraps a text module (HTML, JSON, etc.) so it can be safely inlined into the bundle.
 *
 * @param {string} moduleName Name of the AMD module.
 * @param {string} content Contents of the module to wrap.
 * @returns {string}
 */
const wrapText = (moduleName, content) => {
    const escapedContent = jsesc(content);
    return `define('${moduleName}', function() {
    return '${escapedContent}';
});`;
};

/**
 * Tells if given module contains anonymous AMD module definition.
 *
 * @param {string} moduleContents Contents of the module to wrap.
 */
const isAnonymousAmd = (moduleContents) =>
    !moduleContents.match(/(^|[^.])define\s*\(\s*['"]/m);

/**
 * Changes anonymous AMD module into the named one to be able to bundle it.
 *
 * @param {string} moduleName Name of the module.
 * @param {string} moduleContents Contents of the module to wrap.
 */
const wrapAnonymousAmd = (moduleName, moduleContents) =>
    moduleContents.replace(
        /(^|[^.])define\s*\(/m,
        `$1define('${moduleName}', `
    );

module.exports = {
    isNonAmd,
    wrapNonAmd,
    isText,
    wrapText,
    isAnonymousAmd,
    wrapAnonymousAmd,
};
