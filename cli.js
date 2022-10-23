#!/usr/bin/env node

const program = require('commander');
const logger = require('./lib/utils/logger');
const version = require('./package.json').version;
const errorHandler = function (error) {
    logger.error(error);
    process.exit(1);
};

program.name('magepack').usage('[generate|bundle] <options...>');

program
    .version(version, '-v, --version', 'Output the current version.')
    .helpOption('-h, --help', 'Show this command summary.')
    .addHelpCommand(false);

program
    .command('generate')
    .description(
        'Generate optimization configuration based on given page URLs.'
    )
    .requiredOption('--cms-url <url>', 'CMS page URL.')
    .requiredOption('--category-url <url>', 'Category page URL.')
    .requiredOption('--product-url <url>', 'Product page URL.')
    .option('-u, --auth-username <user>', 'Basic authentication username.')
    .option('-p, --auth-password <password>', 'Basic authentication password.')
    .option('-d, --debug', 'Enable logging of debugging information.')
    .option('--skip-checkout', 'Do not generate a bundle for checkout.')
    .action((config) => {
        if (config.debug) {
            logger.level = 5;
        }

        require('./lib/generate')(config).catch(errorHandler);
    });

program
    .command('bundle')
    .description('Bundle JavaScript files using given configuration file.')
    .option(
        '-c, --config <path>',
        'Configuration file path.',
        'magepack.config.js'
    )
    .option('-g, --glob <path>', 'Glob pattern of themes to bundle.')
    .option('-d, --debug', 'Enable logging of debugging information.')
    .option('-s, --sourcemap', 'Include sourcemaps with generated bundles')
    .option(
        '-m, --minify',
        'Minify bundle using terser irrespective of Magento 2 minification setting'
    )
    .action(({ config, sourcemap, minify, debug, glob }) => {
        if (debug) {
            logger.level = 5;
        }

        require('./lib/bundle')(config, glob, sourcemap, minify).catch(
            errorHandler
        );
    });

program.parse(process.argv);
