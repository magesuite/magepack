/**
 * Strips any plugin prefix from module name.
 *
 * @param {string} moduleName Name of the module that may contain "plugin!" prefix.
 */
const stripPlugin = (moduleName) => moduleName.replace(/^[^!].+!/, '');

module.exports = stripPlugin;
