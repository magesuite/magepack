const stripPlugin = require('./stripPlugin');

describe('stripPlugin utility', () => {
    test('is a function', () => {
        expect(typeof stripPlugin).toEqual('function');
    });

    test('removes plugin prefix from given module name', () => {
        expect(stripPlugin('plugin!module')).toEqual('module');
    });

    test('does nothing for modules without plugins', () => {
        expect(stripPlugin('module')).toEqual('module');
    });
});
