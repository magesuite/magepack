const category = require('magepack/lib/module/category');
// const checkout = require('magepack/lib/module/checkout');
const cms = require('magepack/lib/module/cms');
const customer = require('magepack/lib/module/customer');
const pdp = require('magepack/lib/module/pdp');

/**
 * Base URL stored in a separate variable for less repetition.
 */
const baseUrl = 'https://demo.magesuite.io';

module.exports = {
    /**
     * Script will access this URL and extract Require.js configuration form there.
     */
    configUrl: baseUrl,
    modules: [
        browser =>
            category(browser, {
                url: `${baseUrl}/women/tops-women/jackets-women.html`,
                excludeRegExp: /^\.|amazon|smile|klarna|Magento_Checkout\/js\/view\/minicart/i,
            }),
        // browser =>
        //     checkout(browser, {
        //         url: {
        //             product: `${baseUrl}/overnight-duffle.html`,
        //             cart: `${baseUrl}/checkout/cart/`,
        //             checkout: `${baseUrl}/checkout/`,
        //         },
        //         excludeRegExp: /^\.|amazon|smile|klarna/i,
        //     }),
        browser =>
            cms(browser, {
                url: baseUrl,
                excludeRegExp: /^\.|amazon|smile|klarna|Magento_Checkout\/js\/view\/minicart/i,
            }),
        browser =>
            customer(browser, {
                url: `${baseUrl}/customer/account/login/`,
                email: 'test@demo.magesuite.io',
                password: 'Testing123',
                excludeRegExp: /^\.|amazon|smile|klarna|Magento_Checkout\/js\/view\/minicart/i,
            }),
        browser =>
            pdp(browser, {
                url: [
                    `${baseUrl}/olivia-1-4-zip-light-jacket.html`,
                    `${baseUrl}/overnight-duffle.html`,
                ],
                excludeRegExp: /^\.|amazon|smile|klarna|Magento_Checkout\/js\/view\/minicart/i,
            }),
    ],
};
