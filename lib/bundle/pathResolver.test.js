const pathResolver = require('./pathResolver');

describe('pathResolver module', () => {
    describe('getBundlePath', () => {
        test('is a function', () => {
            expect(typeof pathResolver.getBundlePath).toEqual('function');
        });

        test('returns proper path when minification is turned off', () => {
            expect(pathResolver.getBundlePath('', 'foo', false)).toBe(
                'magepack/bundle-foo.js'
            );
        });

        test('returns proper path when minification is turned on', () => {
            expect(pathResolver.getBundlePath('', 'foo', true)).toBe(
                'magepack/bundle-foo.min.js'
            );
        });
    });
});
