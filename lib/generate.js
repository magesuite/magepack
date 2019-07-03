const puppeteer = require('puppeteer');
const stringify = require('stringify-object');
const merge = require('lodash.merge');
const fs = require('fs-extra');
const path = require('path');

const extractCommons = require('./dependencies/extractCommons');
const depsConfig = require('./dependencies/collectConfig');
const baseConfig = require('./baseConfig');

module.exports = async (outputPath, userConfigPath) => {
    const userConfig = require(path.resolve(userConfigPath));
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--incognito', '--disable-dev-shm-usage'],
    });

    console.log('Collecting configuration and dependencies in the browser...');
    const collectedConfig = await depsConfig(browser, {
        url: userConfig.configUrl,
        excludeRegexp: userConfig.excludeRegExp || /^\./,
    });

    const buildConfig = merge(
        {},
        collectedConfig,
        baseConfig,
        {
            shim: {
                'jquery/jquery-migrate': ['jquery', 'jquery/jquery.cookie'],
                'fotorama/fotorama': ['jquery'],
            },
            paths: {
                text: 'requirejs/text',
                mixins: 'mage/requirejs/mixins',
            },
        },
        userConfig
    );

    const modules = [];
    for (const module of buildConfig.modules) {
        modules.push(
            typeof module !== 'function' ? module : await module(browser)
        );
    }

    console.log('Finished, closing the browser...');
    await browser.close();

    console.log('Extracting common module...');
    buildConfig.modules = extractCommons(modules);

    console.log('Done, outputting following modules:');
    buildConfig.modules.forEach(module => {
        console.log(`${module.name} - ${module.include.length} items.`);
    });

    fs.outputFile(
        path.resolve(outputPath),
        `module.exports = ${stringify(buildConfig, { indent: '  ' })}`
    );
};
