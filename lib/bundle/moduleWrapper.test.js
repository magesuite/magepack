const moduleWrapper = require('./moduleWrapper');

describe('moduleWrapper module', () => {
    describe('isNonAmd', () => {
        test('is a function', () => {
            expect(typeof moduleWrapper.isNonAmd).toEqual('function');
        });

        test('returns true when module is a non-AMD JavaScript module', () => {
            expect(moduleWrapper.isNonAmd('(function() {}());')).toBe(true);
        });

        test('returns true when module is a non-AMD JavaScript module with internal use of "define" within a method name', () => {
            expect(
                moduleWrapper.isNonAmd(
                    '(function() { SomeObject.redefine([1, 2], ["one", "two"]); }());'
                )
            ).toBe(true);
        });

        test('returns false when module is an AMD JavaScript module', () => {
            expect(moduleWrapper.isNonAmd('define([], function() {})')).toBe(
                false
            );
        });
    });

    describe('wrapNonAmd', () => {
        test('is a function', () => {
            expect(typeof moduleWrapper.wrapNonAmd).toEqual('function');
        });

        test('output matches snapshot', () => {
            expect(moduleWrapper.wrapNonAmd('name', 'true;')).toMatchSnapshot();
        });
    });

    describe('isText', () => {
        test('is a function', () => {
            expect(typeof moduleWrapper.isText).toEqual('function');
        });

        test('returns true when module is a text module', () => {
            expect(moduleWrapper.isText('test.html')).toBe(true);
        });

        test('returns false when module is a JavaScript module', () => {
            expect(moduleWrapper.isText('test.js')).toBe(false);
        });
    });

    describe('wrapText', () => {
        test('is a function', () => {
            expect(typeof moduleWrapper.wrapText).toEqual('function');
        });

        test('output matches snapshot', () => {
            expect(moduleWrapper.wrapText('name', 'true;')).toMatchSnapshot();
        });

        test('output matches snapshot for escaped content', () => {
            expect(
                moduleWrapper.wrapText('name', '<div>"Hello"</div>')
            ).toMatchSnapshot();
        });
    });

    describe('isAnonymousAmd', () => {
        test('is a function', () => {
            expect(typeof moduleWrapper.isAnonymousAmd).toEqual('function');
        });

        test('returns true when module is an anonymous AMD module', () => {
            expect(
                moduleWrapper.isAnonymousAmd('define([], function() {});')
            ).toBe(true);
        });

        test('returns false when module is a named AMD module', () => {
            expect(
                moduleWrapper.isAnonymousAmd(
                    'define("foo", [], function() {});'
                )
            ).toBe(false);
        });

        test('returns true for jQuery UI widgets', () => {
            expect(
                moduleWrapper.isAnonymousAmd(
                    `( function( factory ) {
                        "use strict";

                        if ( typeof define === "function" && define.amd ) {
                            define( [
                                "jquery",
                                "../version",
                                "../effect"
                            ], factory );
                        } else {
                            factory( jQuery );
                        }
                    } )( function( $ ) {
                    "use strict";

                    return $.effects.define( "blind", "hide", function( options, done ) {}`
                )
            ).toBe(true);
        });

        // This is a more broad test-case for the above specific scenario
        test('returns true when is an anonymous AMD module and "define" is used as part of a method call internally', () => {
            expect(
                moduleWrapper.isAnonymousAmd(
                    `define([], function () {
                        "use strict";

                        const SomeObject = {};

                        SomeObject.redefine = function (a, b) {
                            console.log('All instances of', a, 'shall now be known as', b);
                        };

                        SomeObject.redefine('hats', 'head-wear');

                        return SomeObject;
                    });
                    `
                )
            ).toBe(true);
        });

        test('returns false when not an AMD module and "define" is used as part of a method internally', () => {
            expect(
                moduleWrapper.isAnonymousAmd(
                    `(function () {
                        "use strict";

                        const SomeObject = {};

                        SomeObject.redefine = function (a, b) {
                            console.log('All instances of', a, 'shall now be known as', b);
                        };

                        SomeObject.redefine('hats', 'head-wear');

                        window.SomeObject = SomeObject;
                    })();
                    `
                )
            ).toBe(false);
        });
    });

    describe('wrapAnonymousAmd', () => {
        test('is a function', () => {
            expect(typeof moduleWrapper.wrapAnonymousAmd).toEqual('function');
        });

        test('wraps simple module', () => {
            expect(
                moduleWrapper.wrapAnonymousAmd(
                    'foo',
                    'define([], function() {});'
                )
            ).toBe("define('foo', [], function() {});");
        });

        test('wraps module prefixed with semicolon', () => {
            expect(
                moduleWrapper.wrapAnonymousAmd(
                    'foo',
                    ';define([], function() {});'
                )
            ).toBe(";define('foo', [], function() {});");
        });

        test('wraps module prefixed with whitespace', () => {
            expect(
                moduleWrapper.wrapAnonymousAmd(
                    'foo',
                    '   define([], function() {});'
                )
            ).toBe("   define('foo', [], function() {});");
        });

        test('wraps module in correct place', () => {
            expect(
                moduleWrapper.wrapAnonymousAmd(
                    'foo',
                    '$.effects.define( "blind", "hide", function( options, done ) {}   define([], function() {});'
                )
            ).toBe(
                `$.effects.define( "blind", "hide", function( options, done ) {}   define('foo', [], function() {});`
            );
        });
    });
});
