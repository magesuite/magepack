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

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/magesuite/magepack/tags).

## License

This project is licensed under the OSL-3.0 license - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

-   Authors of [Advanced JavaScript bundling guide](https://devdocs.magento.com/guides/v2.3/performance-best-practices/advanced-js-bundling.html)
-   Magento Community Engineering Slack.
