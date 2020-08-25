const moduleWrapper = require('./moduleWrapper');

describe('moduleWrapper module', () => {
    describe('isNonAmd', () => {
        test('is a function', () => {
            expect(typeof moduleWrapper.isNonAmd).toEqual('function');
        });

        test('returns true when module is a non-AMD JavaScript module', () => {
            expect(moduleWrapper.isNonAmd('(function() {}());')).toBe(true);
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
    });

    describe('wrapAnonymousAmd', () => {
        test('is a function', () => {
            expect(typeof moduleWrapper.wrapAnonymousAmd).toEqual('function');
        });

        test('output matches snapshot', () => {
            expect(
                moduleWrapper.wrapAnonymousAmd(
                    'foo',
                    'define([], function() {});'
                )
            ).toMatchSnapshot();
        });
    });
});
