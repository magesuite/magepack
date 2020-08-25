const fs = require('fs');
const path = require('path');
const { stringify } = require('javascript-stringify');
const terser = require('terser');
const gzipSize = require('gzip-size');

const logger = require('./utils/logger');
const getLocales = require('./bundle/getLocales');
const pathResolver = require('./bundle/pathResolver');
const checkMinifyOn = require('./bundle/checkMinifyOn');
const moduleWrapper = require('./bundle/moduleWrapper');
const modulePathMapper = require('./bundle/moduleMapResolver');

module.exports = async (bundlingConfigPath) => {
    const bundlingConfigRealPath = path.resolve(bundlingConfigPath);

    logger.info(`Using bundling config from "${bundlingConfigRealPath}".`);

    const bundlingConfig = require(bundlingConfigRealPath);

    const localesPaths = getLocales();

    const isMinifyOn = checkMinifyOn(localesPaths);

    localesPaths.forEach((localePath) => {
        logger.info(`Creating bundles for "${localePath}".`);

        bundlingConfig.forEach((bundle) => {
            const bundleName = bundle.name;

            logger.debug(`Creating bundle "${bundleName}".`);

            const bundlePath = pathResolver.getBundlePath(
                localePath,
                bundleName,
                isMinifyOn
            );

            const pathMapper = modulePathMapper(localePath, isMinifyOn);

            let bundleContents = '';
            const bundledModules = [];

            logger.debug(`Collecting modules for "${bundleName}".`);

            for (const moduleName in bundle.modules) {
                const modulePath = pathMapper(
                    pathResolver.getModuleRealPath(
                        moduleName,
                        bundle.modules[moduleName],
                        isMinifyOn
                    )
                );

                logger.debug(`Loading "${moduleName}" from "${modulePath}".`);

                try {
                    let moduleContents = fs.readFileSync(modulePath, {
                        encoding: 'utf8',
                    });

                    if (moduleWrapper.isText(modulePath)) {
                        moduleContents = moduleWrapper.wrapText(
                            moduleName,
                            moduleContents
                        );
                    } else if (moduleWrapper.isNonAmd(moduleContents)) {
                        moduleContents = moduleWrapper.wrapNonAmd(
                            moduleName,
                            moduleContents
                        );
                    } else if (moduleWrapper.isAnonymousAmd(moduleContents)) {
                        moduleContents = moduleWrapper.wrapAnonymousAmd(
                            moduleName,
                            moduleContents
                        );
                    }

                    bundleContents += moduleContents + '\n';
                    bundledModules.push(moduleName);
                } catch (error) {
                    logger.debug(
                        `Module "${moduleName}", not found under "${modulePath}".`
                    );
                }
            }

            logger.debug(`Bundle "${bundleName}" collected.`);

            if (isMinifyOn) {
                logger.debug(`Minifying "${bundleName}" bundle.`);

                const { code, error: minificationError } = terser.minify(
                    bundleContents,
                    {
                        output: {
                            comments: false,
                        },
                        mangle: {
                            reserved: [
                                '$',
                                'jQuery',
                                'define',
                                'require',
                                'exports',
                            ],
                        },
                    }
                );

                if (minificationError) {
                    logger.error(minificationError);
                }

                bundleContents = code;

                logger.debug(`Bundle "${bundleName}" minified.`);
            }

            logger.debug(
                `Writing "${bundleName}" bundle and configuration to disk.`
            );

            const bundlePathDir = path.dirname(bundlePath);
            if (!fs.existsSync(bundlePathDir)) {
                fs.mkdirSync(path.dirname(bundlePath), { recursive: true });
            }

            fs.writeFileSync(bundlePath, bundleContents);

            const bundleOptions = {
                bundles: {
                    [`magepack/bundle-${bundleName}`]: bundledModules,
                },
            };

            const bundleConfigPath = pathResolver.getBundleConfigPath(
                localePath,
                bundleName,
                isMinifyOn
            );

            const bundleConfigPathDir = path.dirname(bundleConfigPath);
            if (!fs.existsSync(bundleConfigPathDir)) {
                fs.mkdirSync(bundleConfigPathDir, { recursive: true });
            }

            fs.writeFileSync(
                bundleConfigPath,
                `requirejs.config(${stringify(bundleOptions)});`
            );

            const bundleSize = Math.round(bundleContents.length / 1024) + ' kB';
            const gzipedSize =
                Math.round(gzipSize.sync(bundleContents) / 1024) + ' kB';

            logger.success(
                `Generated bundle "${bundleName}"`.padEnd(30) +
                    `- ${bundleSize} (${gzipedSize} gz).`
            );
        });
    });
};
