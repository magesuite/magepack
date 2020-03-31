const fs = require('fs');
const path = require('path');

module.exports = (localesPaths) =>
    localesPaths[0] &&
    fs.existsSync(path.join(localesPaths[0], 'requirejs-config.min.js'));
