const fs = require('fs-extra');
const requirejs = require('requirejs');
const merge = require('lodash.merge');
const path = require('path');

module.exports = async (configPath, dirPath) => {
    const buildConfig = require(path.resolve(configPath));

    const dir = path.resolve(dirPath);
    const baseUrl = dir + '_tmp';

    const config = merge(
        {
            dir,
            baseUrl,
        },
        buildConfig
    );

    console.log('Moving static files to temporary directory...');

    await fs.move(dir, baseUrl, { overwrite: true });

    console.log('Done, running the optimizer...');

    requirejs.optimize(
        config,
        async () => {
            console.log('Optimized, adjusting configuration...');

            const fileName = path.join(dir, 'requirejs-config.js');
            let contents = '';

            config.modules.forEach(bundle => {
                if (!bundle.create) {
                    return;
                }

                const bundleConfig = {
                    [bundle.name]: bundle.include.map(bundle =>
                        bundle.replace(/\.js$/, '')
                    ),
                };
                contents += `\r\nrequire.config({
       bundles: ${JSON.stringify(bundleConfig)},
   });`;
            });

            console.log(
                'Adding bundle information to requirejs-config.js file...'
            );

            await fs.appendFile(fileName, contents);

            // console.log('Removing temporary directory for static files...');
            // await fs.remove(baseUrl);

            console.log('Finished optimized bundling.');
        },
        function(error) {
            console.error(error);
            process.exit(1);
        }
    );
};
