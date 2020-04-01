/**
 * List of modules that should be excluded from all bundles.
 */
module.exports = [
    /**
     * Also known as legacyBuild.min.js, still used by some extensions.
     * Overwrites native objects sometimes causing bugs so it's safer to exclude it.
     */
    'prototype',
    /**
     * Loaded and defined synchronously, should be skipped.
     */
    'mixins',
    /**
     * Build-in RequireJS modules.
     */
    'exports',
    'require',
    'module',
];
