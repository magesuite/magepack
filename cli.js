#!/usr/bin/env node

const program = require('commander');
const version = require('./package.json').version;

program.usage('[--generate|--bundle] <options...>');

program
    .version(version)
    .option(
        '-g, --generate',
        'generate optimization configuration based on given configuration file.'
    )
    .option('-c, --config <path>', 'input path for configuration file.')
    .option(
        '-o, --output <path>',
        'output path for bundling configuration file.'
    )
    .option(
        '-b, --bundle',
        'bundle JavaScript files based on given configuration file.'
    )
    .option(
        '-d, --dir <path>',
        'input path for directory containing JavaScript files.'
    );

program.parse(process.argv);

if (program.generate) {
    if (!program.config || !program.output) {
        throw new Error(
            'Generation requires both --config and --output options to be provided.'
        );
    }

    try {
        require('./lib/generate')(program.output, program.config);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
} else if (program.bundle) {
    if (!program.config || !program.dir) {
        throw new Error(
            'Generation requires both --config and --dir options to be provided.'
        );
    }

    try {
        require('./lib/optimize')(program.config, program.dir);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
} else {
    throw new Error('You need to provide either --generate or --bundle option');
}
