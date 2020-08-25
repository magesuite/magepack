jest.mock('glob');
jest.mock('fs');

const glob = require('glob');
const fs = require('fs');
const getLocales = require('./getLocales');

describe('getLocales utility', () => {
    test('is a function', () => {
        expect(typeof getLocales).toEqual('function');
    });

    test('returns found locales', () => {
        glob.sync.mockReturnValue(['pub/static/frontend/Magento/luma']);
        fs.existsSync.mockReturnValue(true);

        expect(getLocales()).toEqual(['pub/static/frontend/Magento/luma']);
    });

    test('returns found locales excluding blank theme', () => {
        glob.sync.mockReturnValue([
            'pub/static/frontend/Magento/luma',
            'pub/static/frontend/Magento/blank',
        ]);
        fs.existsSync.mockReturnValue(true);

        expect(getLocales()).toEqual(['pub/static/frontend/Magento/luma']);
    });

    test('throws error when locales are found but have no requirejs-config.js file', () => {
        glob.sync.mockReturnValue([]);
        fs.existsSync.mockReturnValue(false);

        expect(() => getLocales()).toThrow();
    });

    test('throws error when no locales are found', () => {
        glob.sync.mockReturnValue([]);

        expect(() => getLocales()).toThrow();
    });
});
