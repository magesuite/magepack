const orderModules = require('./orderModules');

describe('orderModules utility', () => {
    it('is a function', () => {
        expect(typeof orderModules).toEqual('function');
    });

    it('outputs dependants after dependencies', () => {
        expect(
            orderModules(
                {
                    requires_jquery: 'requires_jquery',
                    jquery: 'jquery',
                    requires_nothing: 'requires_nothing',
                },
                {
                    jquery: {},
                    requires_jquery: {
                        jquery: true,
                    },
                    requires_nothing: {},
                }
            )
        ).toEqual({
            jquery: 'jquery',
            requires_nothing: 'requires_nothing',
            requires_jquery: 'requires_jquery',
        });
    });

    test('outputs unrelated modules in alphabetical order', () => {
        expect(
            orderModules(
                {
                    requires_jquery: 'requires_jquery',
                    jquery: 'jquery',
                    has_no_requirements: 'has_no_requirements',
                },
                {
                    jquery: {},
                    requires_jquery: {
                        jquery: true,
                    },
                    has_no_requirements: {},
                }
            )
        ).toEqual({
            has_no_requirements: 'has_no_requirements',
            jquery: 'jquery',
            requires_jquery: 'requires_jquery',
        });
    });

    it('handles circular requirements gracefully', () => {
        expect(
            orderModules(
                {
                    'jquery/ui': 'jquery/ui',
                    jquery: 'jquery',
                    'mymodule/widget': 'mymodule/widget',
                    mymodule: 'mymodule',
                },
                {
                    jquery: {},
                    'jquery/ui': {
                        jquery: true,
                    },
                    mymodule: {
                        jquery: true,
                        'mymodule/widget': true,
                    },
                    'mymodule/widget': {
                        jquery: true,
                        mymodule: true,
                    },
                }
            )
        ).toEqual({
            jquery: 'jquery',
            'jquery/ui': 'jquery/ui',
            'mymodule/widget': 'mymodule/widget',
            mymodule: 'mymodule',
        });
    });
});
