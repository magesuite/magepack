# MagePack

Attempt at making Require.js optimization for Magento shops as automatic as possible without having to follow entire [Advanced JavaScript bundling guide](https://devdocs.magento.com/guides/v2.3/performance-best-practices/advanced-js-bundling.html) by hand.

## Installing

Install with npm:

```
npm install -g magepack --no-optional
```

Install with yarn:

```
yarn global add magepack --ignore-optional
```

In order to save installation time, disk space and bandwidth on the CI, puppeteer is listed as an optional package because it is only required for configuration generation step.

## Bundling

By design of this module, bundling process is divided into two steps: configuration generation - usually run locally against target environment and bundling which has to be run after deployment of static content is finished.

### Generating bundler configuration

In order for Require.js optimizer to work properly we need to prepare a configuration for it, which contains following pieces of information:

-   Lists of `deps`, `paths`, `shim` and `map`.
-   List of `modules`.
-   Configuration options for optimizer itself.

MagePack is able to extract some of the above automatically from your existing shop website and provides sensible defaults for the rest.

Before running the generation, you have to prepare a small config file, sample for which along with some comments can be found at [config.sample.js](https://github.com/magesuite/magepack/blob/master/config.sample.js). This config file will be merged on top of [base configuration](https://github.com/magesuite/magepack/blob/master/lib/baseConfig.js) so it is possible to overwrite any of the defaults.

After preparing the `config.js` file (and making sure Puppeteer is installed) we can run the generation process via:

```
magepack --generate --config config.js --output build.js
```

which will make the module go through the shop based on `config.js` and gather optimizer configuration into `build.js` file.

Please note, that in order to achieve best performance the generator extracts all of the common modules used by each group defined within `modules` array into separate, synchronously-loaded package.

### Bundling

Once you have generated bundler configuration, the next step would be to trigger the actual optimization after static content deploy stage has finished for every theme and language that is going to be enabled on the storefront:

```
magepack --bundle --config build.js --dir pub/static/frontend/<vendor>/<theme>/<language>
```

## Defining custom modules

There may be the case that you would like to some extra modules instead or on top of what is already provided. There are two ways of defining a module:

Plain object compatible with [Require.js definition](https://github.com/requirejs/r.js/blob/master/build/example.build.js#L355):

```javascript
modules: [
    {
        name: 'foo/bar',
        create: true,
        exclude: ['bundles/common'],
        include: ['foo/bar/baz'],
    },
];
```

Asynchronous function that accepts puppeteer's [Browser class instance](https://pptr.dev/#?product=Puppeteer&version=v1.16.0&show=api-class-browser) and returns a promise which resolves to above plain object:

```javascript
modules: [
    browser =>
        Promise.resolve({
            name: 'foo/bar',
            create: true,
            exclude: ['bundles/common'],
            include: ['foo/bar/baz'],
        }),
];
```

## Quirks and Gotchas

### Modules with mixins defined cannot be included in a bundle

Because of below code located within [RequireJS](https://github.com/requirejs/requirejs/blob/042628d72a9be906f9e79c8e1965439c2beb946b/require.js#L1634):

```javascript
bundleId = getOwn(bundlesMap, moduleName);

if (bundleId) {
    return context.nameToUrl(bundleId, ext, skipExt); // Returns bundle path instead of module path.
}
```

plugin is not able to properly match given module with its mixins which prevents them from applying. This means that any module which has mixins defined cannot be bundled.

### Text inlining has to be disabled

In the early stages there were issues with Magento being unable to properly parse Knockout templates that were inlined by the optimizer so this feature is disabled. I will be revisiting this option soon to check if that obstacle can be resolved.

### Text plugin requires additional configuration

As far as I understand, because of lack of inlining and CDN usage, [text plugin requires additional configuration](https://github.com/requirejs/text#xhr-restrictions) which this tool writes into `requirejs.config.js` when bundling:

```javascript
requirejs.config({
    config: {
        text: {
            useXhr: function() {
                return true;
            },
        },
    },
});
```

Above lines prevent the plugin from requesting JavaScript versions of required templates resulting in 404 responses.

### Uglify's mangling has to be disabled

Because there are already some minified files included in Magento (mainly `legacy-build.min.js`) mangling them second time breaks the source code and leads to some random errors. Sadly, there is no way to exclude specific files from this transformation so we had to disable it completely.

### Additional RequireJS config has to be added

Last, but not least the following config has to be added when bundling, otherwise you'll encounter missing dependencies and `Cannot access x of undefined` errors:

```javascript
{
    shim: {
        'jquery/jquery-migrate': ['jquery', 'jquery/jquery.cookie'],
        'fotorama/fotorama': ['jquery'],
    },
    paths: {
        text: 'requirejs/text', // Magento's version of the plugin doesn't support non-browser environment.
        mixins: 'mage/requirejs/mixins',
    },
}
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/magesuite/magepack/tags).

## License

This project is licensed under the OSL-3.0 license - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

-   Authors of [Advanced JavaScript bundling guide](https://devdocs.magento.com/guides/v2.3/performance-best-practices/advanced-js-bundling.html)
-   Magento Community Engineering Slack.
