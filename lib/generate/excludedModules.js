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
    /**
     * jQuery UI Effects
     */
    'jquery/ui-modules/effects/effect-blind',
    'jquery/ui-modules/effects/effect-bounce',
    'jquery/ui-modules/effects/effect-clip',
    'jquery/ui-modules/effects/effect-drop',
    'jquery/ui-modules/effects/effect-explode',
    'jquery/ui-modules/effects/effect-fade',
    'jquery/ui-modules/effects/effect-fold',
    'jquery/ui-modules/effects/effect-highlight',
    'jquery/ui-modules/effects/effect-scale',
    'jquery/ui-modules/effects/effect-pulsate',
    'jquery/ui-modules/effects/effect-shake',
    'jquery/ui-modules/effects/effect-slide',
    'jquery/ui-modules/effects/effect-transfer',
    'jquery/ui-modules/effect',
];
