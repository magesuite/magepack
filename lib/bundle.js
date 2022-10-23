const fs = require('fs');
const path = require('path');
const { stringify } = require('javascript-stringify');
const terser = require('terser');
const gzipSize = require('gzip-size');
const genSourceMap = require('generate-sourcemap');

const logger = require('./utils/logger');
const getLocales = require('./bundle/getLocales');
const pathResolver = require('./bundle/pathResolver');
const checkMinifyOn = require('./bundle/checkMinifyOn');
const moduleWrapper = require('./bundle/moduleWrapper');
const modulePathMapper = require('./bundle/moduleMapResolver');

module.exports = async (
    bundlingConfigPath,
    localesGlobPattern,
    includeSourcemaps = false,
    forceMinify = false
) => {
    const bundlingConfigRealPath = path.resolve(bundlingConfigPath);

    logger.info(`Using bundling config from "${bundlingConfigRealPath}".`);

    const bundlingConfig = require(bundlingConfigRealPath);

    const localesPaths = getLocales(localesGlobPattern);

    const isMinifyOn = checkMinifyOn(localesPaths);

    localesPaths.forEach(async (localePath) => {
        logger.info(`Creating bundles for "${localePath}".`);

        bundlingConfig.forEach(async (bundle) => {
            const bundleName = bundle.name;

            logger.debug(`Creating bundle "${bundleName}".`);

            const bundlePath = pathResolver.getBundlePath(
                localePath,
                bundleName,
                isMinifyOn
            );

            const pathMapper = modulePathMapper(localePath, isMinifyOn);
            const bundleFileName = path.basename(bundlePath);
            const bundlePathDir = path.dirname(bundlePath);

            if (!fs.existsSync(bundlePathDir)) {
                fs.mkdirSync(path.dirname(bundlePath), {
                    recursive: true,
                });
            }

            let bundleContents = '';
            const bundledModules = [];
            const sourceMapRanges = [];
            const sourceRange = {
                start: 0,
                end: 0,
            };

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

                    sourceRange.end =
                        sourceRange.start +
                        moduleContents.split(/\r?\n/).length;
                    bundleContents += moduleContents + '\n';
                    bundledModules.push(moduleName);
                    sourceMapRanges.push({
                        sourceFile: path.relative(bundlePathDir, modulePath),
                        start: sourceRange.start,
                        end: sourceRange.end,
                    });
                    sourceRange.start = sourceRange.end;
                } catch (error) {
                    logger.debug(
                        `Module "${moduleName}", not found under "${modulePath}".`
                    );
                }
            }

            logger.debug(`Bundle "${bundleName}" collected.`);

            const sourceMap = genSourceMap(bundleFileName);
            sourceMap.addRanges(sourceMapRanges);

            if (isMinifyOn || forceMinify) {
                logger.debug(`Minifying "${bundleName}" bundle.`);

                const terserConfig = {
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
                };

                if (includeSourcemaps) {
                    terserConfig.sourceMap = {
                        content: sourceMap.getMap(),
                        filename: bundleFileName,
                        url: `${bundleFileName}.map`,
                    };
                }

                const {
                    code,
                    map,
                    error: minificationError,
                } = await terser.minify(bundleContents, terserConfig);

                if (minificationError) {
                    logger.error(minificationError);
                }

                bundleContents = code;

                logger.debug(`Bundle "${bundleName}" minified.`);

                if (includeSourcemaps) {
                    fs.writeFileSync(`${bundlePath}.map`, map);
                }
            } else if (includeSourcemaps) {
                bundleContents += `\n//# sourceMappingURL=${bundleFileName}.map\n`;
                fs.writeFileSync(`${bundlePath}.map`, sourceMap.getMap());
            }

            logger.debug(
                `Writing "${bundleName}" bundle and configuration to disk.`
            );

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
