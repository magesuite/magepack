const jsesc = require('jsesc');

const wrapNonAmd = (moduleName, content) => {
    return `${content}
    define('${moduleName}', function() {
        var shim = require.s.contexts._.config.shim['${moduleName}'];
        return shim && shim.exportsFn && shim.exportsFn();
    });`;
};

const wrapText = (moduleName, content) => {
    const escapedContent = jsesc(content);
    return `define('${moduleName}', function() {
        return '${escapedContent}';
    });`;
};

module.exports = { wrapNonAmd, wrapText };
