const glob = require('glob');

module.exports = () =>
    glob
        .sync('pub/static/frontend/*/*/*')
        .filter((locale) => !locale.includes('Magento/blank'));
