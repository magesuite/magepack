const jsesc = require('jsesc');

/**
 * Wraps non-AMD module so it can be safely inlined into the bundle.
 *
 * @param {string} moduleName Name of the AMD module.
 * @param {string} content Contents of the module to wrap.
 * @returns {string}
 */
const wrapNonAmd = (moduleName, content) => {
    return `${content}
    define('${moduleName}', function() {
        var shim = require.s.contexts._.config.shim['${moduleName}'];
        return shim && shim.exportsFn && shim.exportsFn();
    });`;
};

/**
 * Wraps a text module (HTML, JSON, etc.) so it can be safely inline into the bundle.
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

module.exports = { wrapNonAmd, wrapText };
