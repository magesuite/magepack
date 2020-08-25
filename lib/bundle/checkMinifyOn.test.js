jest.mock('fs');

const fs = require('fs');
const checkMinifyOn = require('./checkMinifyOn');

describe('checkMinifyOn utility', () => {
    test('is a function', () => {
        expect(typeof checkMinifyOn).toEqual('function');
    });

    test('returns true when minified configuration file exists', () => {
        fs.existsSync.mockReturnValue(true);

        expect(checkMinifyOn(['pub/static/frontend/Magento/luma'])).toEqual(
            true
        );
    });

    test('returns false when minified configuration file does not exist', () => {
        fs.existsSync.mockReturnValue(false);

        expect(checkMinifyOn(['pub/static/frontend/Magento/luma'])).toEqual(
            false
        );
    });

    test('returns false no locales were provided', () => {
        fs.existsSync.mockReturnValue(false);

        expect(checkMinifyOn([])).toEqual(false);
    });
});
