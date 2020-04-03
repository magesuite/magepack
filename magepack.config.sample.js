/**
 * Sample Magepack config generated for clean Magento 2.3.4 with sample data installed.
 */
module.exports = [
    {
        name: 'common',
        modules: {
            FormData: 'FormData',
            'Magento_Captcha/js/action/refresh':
                'Magento_Captcha/js/action/refresh',
            'Magento_Captcha/js/model/captcha':
                'Magento_Captcha/js/model/captcha',
            'Magento_Captcha/js/model/captchaList':
                'Magento_Captcha/js/model/captchaList',
            'Magento_Captcha/js/view/checkout/defaultCaptcha':
                'Magento_Captcha/js/view/checkout/defaultCaptcha',
            'Magento_Captcha/js/view/checkout/loginCaptcha':
                'Magento_Captcha/js/view/checkout/loginCaptcha',
            'Magento_Catalog/js/price-box': 'Magento_Catalog/js/price-box',
            'Magento_Catalog/js/price-utils': 'Magento_Catalog/js/price-utils',
            'Magento_Catalog/js/product/query-builder':
                'Magento_Catalog/js/product/query-builder',
            'Magento_Catalog/js/product/storage/data-storage':
                'Magento_Catalog/js/product/storage/data-storage',
            'Magento_Catalog/js/product/storage/ids-storage':
                'Magento_Catalog/js/product/storage/ids-storage',
            'Magento_Catalog/js/product/storage/ids-storage-compare':
                'Magento_Catalog/js/product/storage/ids-storage-compare',
            'Magento_Catalog/js/product/storage/storage-service':
                'Magento_Catalog/js/product/storage/storage-service',
            'Magento_Catalog/js/storage-manager':
                'Magento_Catalog/js/storage-manager',
            'Magento_Catalog/js/view/compare-products':
                'Magento_Catalog/js/view/compare-products',
            'Magento_Catalog/js/view/image': 'Magento_Catalog/js/view/image',
            'Magento_Checkout/js/sidebar': 'Magento_Checkout/js/sidebar',
            'Magento_Checkout/js/view/minicart':
                'Magento_Checkout/js/view/minicart',
            'Magento_Customer/js/action/login':
                'Magento_Customer/js/action/login',
            'Magento_Customer/js/customer-data':
                'Magento_Customer/js/customer-data',
            'Magento_Customer/js/invalidation-processor':
                'Magento_Customer/js/invalidation-processor',
            'Magento_Customer/js/invalidation-rules/website-rule':
                'Magento_Customer/js/invalidation-rules/website-rule',
            'Magento_Customer/js/model/authentication-popup':
                'Magento_Customer/js/model/authentication-popup',
            'Magento_Customer/js/section-config':
                'Magento_Customer/js/section-config',
            'Magento_Customer/js/view/authentication-popup':
                'Magento_Customer/js/view/authentication-popup',
            'Magento_Customer/js/view/customer':
                'Magento_Customer/js/view/customer',
            'Magento_Msrp/js/view/checkout/minicart/subtotal/totals':
                'Magento_Msrp/js/view/checkout/minicart/subtotal/totals',
            'Magento_PageCache/js/page-cache':
                'Magento_PageCache/js/page-cache',
            'Magento_Persistent/js/view/customer-data-mixin':
                'Magento_Persistent/js/view/customer-data-mixin',
            'Magento_Search/js/form-mini': 'Magento_Search/js/form-mini',
            'Magento_Swatches/js/swatch-renderer':
                'Magento_Swatches/js/swatch-renderer',
            'Magento_Tax/js/view/checkout/minicart/subtotal/totals':
                'Magento_Tax/js/view/checkout/minicart/subtotal/totals',
            'Magento_Theme/js/cookie-status': 'Magento_Theme/js/cookie-status',
            'Magento_Theme/js/responsive': 'Magento_Theme/js/responsive',
            'Magento_Theme/js/theme': 'Magento_Theme/js/theme',
            'Magento_Theme/js/view/messages': 'Magento_Theme/js/view/messages',
            'Magento_Translation/js/mage-translation-dictionary':
                'Magento_Translation/js/mage-translation-dictionary',
            'Magento_Ui/js/block-loader': 'Magento_Ui/js/block-loader',
            'Magento_Ui/js/core/app': 'Magento_Ui/js/core/app',
            'Magento_Ui/js/core/renderer/layout':
                'Magento_Ui/js/core/renderer/layout',
            'Magento_Ui/js/core/renderer/types':
                'Magento_Ui/js/core/renderer/types',
            'Magento_Ui/js/form/adapter': 'Magento_Ui/js/form/adapter',
            'Magento_Ui/js/form/adapter/buttons':
                'Magento_Ui/js/form/adapter/buttons',
            'Magento_Ui/js/form/form': 'Magento_Ui/js/form/form',
            'Magento_Ui/js/lib/core/class': 'Magento_Ui/js/lib/core/class',
            'Magento_Ui/js/lib/core/collection':
                'Magento_Ui/js/lib/core/collection',
            'Magento_Ui/js/lib/core/element/element':
                'Magento_Ui/js/lib/core/element/element',
            'Magento_Ui/js/lib/core/element/links':
                'Magento_Ui/js/lib/core/element/links',
            'Magento_Ui/js/lib/core/events': 'Magento_Ui/js/lib/core/events',
            'Magento_Ui/js/lib/core/storage/local':
                'Magento_Ui/js/lib/core/storage/local',
            'Magento_Ui/js/lib/key-codes': 'Magento_Ui/js/lib/key-codes',
            'Magento_Ui/js/lib/knockout/bindings/after-render':
                'Magento_Ui/js/lib/knockout/bindings/after-render',
            'Magento_Ui/js/lib/knockout/bindings/autoselect':
                'Magento_Ui/js/lib/knockout/bindings/autoselect',
            'Magento_Ui/js/lib/knockout/bindings/bind-html':
                'Magento_Ui/js/lib/knockout/bindings/bind-html',
            'Magento_Ui/js/lib/knockout/bindings/bootstrap':
                'Magento_Ui/js/lib/knockout/bindings/bootstrap',
            'Magento_Ui/js/lib/knockout/bindings/collapsible':
                'Magento_Ui/js/lib/knockout/bindings/collapsible',
            'Magento_Ui/js/lib/knockout/bindings/color-picker':
                'Magento_Ui/js/lib/knockout/bindings/color-picker',
            'Magento_Ui/js/lib/knockout/bindings/datepicker':
                'Magento_Ui/js/lib/knockout/bindings/datepicker',
            'Magento_Ui/js/lib/knockout/bindings/fadeVisible':
                'Magento_Ui/js/lib/knockout/bindings/fadeVisible',
            'Magento_Ui/js/lib/knockout/bindings/i18n':
                'Magento_Ui/js/lib/knockout/bindings/i18n',
            'Magento_Ui/js/lib/knockout/bindings/keyboard':
                'Magento_Ui/js/lib/knockout/bindings/keyboard',
            'Magento_Ui/js/lib/knockout/bindings/mage-init':
                'Magento_Ui/js/lib/knockout/bindings/mage-init',
            'Magento_Ui/js/lib/knockout/bindings/optgroup':
                'Magento_Ui/js/lib/knockout/bindings/optgroup',
            'Magento_Ui/js/lib/knockout/bindings/outer_click':
                'Magento_Ui/js/lib/knockout/bindings/outer_click',
            'Magento_Ui/js/lib/knockout/bindings/range':
                'Magento_Ui/js/lib/knockout/bindings/range',
            'Magento_Ui/js/lib/knockout/bindings/resizable':
                'Magento_Ui/js/lib/knockout/bindings/resizable',
            'Magento_Ui/js/lib/knockout/bindings/scope':
                'Magento_Ui/js/lib/knockout/bindings/scope',
            'Magento_Ui/js/lib/knockout/bindings/simple-checked':
                'Magento_Ui/js/lib/knockout/bindings/simple-checked',
            'Magento_Ui/js/lib/knockout/bindings/staticChecked':
                'Magento_Ui/js/lib/knockout/bindings/staticChecked',
            'Magento_Ui/js/lib/knockout/bindings/tooltip':
                'Magento_Ui/js/lib/knockout/bindings/tooltip',
            'Magento_Ui/js/lib/knockout/bootstrap':
                'Magento_Ui/js/lib/knockout/bootstrap',
            'Magento_Ui/js/lib/knockout/extender/bound-nodes':
                'Magento_Ui/js/lib/knockout/extender/bound-nodes',
            'Magento_Ui/js/lib/knockout/extender/observable_array':
                'Magento_Ui/js/lib/knockout/extender/observable_array',
            'Magento_Ui/js/lib/knockout/template/engine':
                'Magento_Ui/js/lib/knockout/template/engine',
            'Magento_Ui/js/lib/knockout/template/loader':
                'Magento_Ui/js/lib/knockout/template/loader',
            'Magento_Ui/js/lib/knockout/template/observable_source':
                'Magento_Ui/js/lib/knockout/template/observable_source',
            'Magento_Ui/js/lib/knockout/template/renderer':
                'Magento_Ui/js/lib/knockout/template/renderer',
            'Magento_Ui/js/lib/logger/console-logger':
                'Magento_Ui/js/lib/logger/console-logger',
            'Magento_Ui/js/lib/logger/console-output-handler':
                'Magento_Ui/js/lib/logger/console-output-handler',
            'Magento_Ui/js/lib/logger/entry': 'Magento_Ui/js/lib/logger/entry',
            'Magento_Ui/js/lib/logger/entry-factory':
                'Magento_Ui/js/lib/logger/entry-factory',
            'Magento_Ui/js/lib/logger/formatter':
                'Magento_Ui/js/lib/logger/formatter',
            'Magento_Ui/js/lib/logger/levels-pool':
                'Magento_Ui/js/lib/logger/levels-pool',
            'Magento_Ui/js/lib/logger/logger':
                'Magento_Ui/js/lib/logger/logger',
            'Magento_Ui/js/lib/logger/logger-utils':
                'Magento_Ui/js/lib/logger/logger-utils',
            'Magento_Ui/js/lib/logger/message-pool':
                'Magento_Ui/js/lib/logger/message-pool',
            'Magento_Ui/js/lib/registry/registry':
                'Magento_Ui/js/lib/registry/registry',
            'Magento_Ui/js/lib/spinner': 'Magento_Ui/js/lib/spinner',
            'Magento_Ui/js/lib/view/utils/async':
                'Magento_Ui/js/lib/view/utils/async',
            'Magento_Ui/js/lib/view/utils/bindings':
                'Magento_Ui/js/lib/view/utils/bindings',
            'Magento_Ui/js/lib/view/utils/dom-observer':
                'Magento_Ui/js/lib/view/utils/dom-observer',
            'Magento_Ui/js/modal/alert': 'Magento_Ui/js/modal/alert',
            'Magento_Ui/js/modal/confirm': 'Magento_Ui/js/modal/confirm',
            'Magento_Ui/js/modal/modal': 'Magento_Ui/js/modal/modal',
            'Magento_Ui/js/model/messageList':
                'Magento_Ui/js/model/messageList',
            'Magento_Ui/js/model/messages': 'Magento_Ui/js/model/messages',
            'Magento_Ui/js/view/messages': 'Magento_Ui/js/view/messages',
            MutationObserver: 'MutationObserver',
            domReady: 'requirejs/domReady',
            'es6-collections': 'es6-collections',
            jquery: 'jquery',
            'jquery-ui-modules/button': 'jquery/ui-modules/button',
            'jquery-ui-modules/core': 'jquery/ui-modules/core',
            'jquery-ui-modules/datepicker': 'jquery/ui-modules/datepicker',
            'jquery-ui-modules/dialog': 'jquery/ui-modules/dialog',
            'jquery-ui-modules/draggable': 'jquery/ui-modules/draggable',
            'jquery-ui-modules/effect': 'jquery/ui-modules/effect',
            'jquery-ui-modules/effect-blind': 'jquery/ui-modules/effect-blind',
            'jquery-ui-modules/effect-fade': 'jquery/ui-modules/effect-fade',
            'jquery-ui-modules/menu': 'jquery/ui-modules/menu',
            'jquery-ui-modules/mouse': 'jquery/ui-modules/mouse',
            'jquery-ui-modules/position': 'jquery/ui-modules/position',
            'jquery-ui-modules/resizable': 'jquery/ui-modules/resizable',
            'jquery-ui-modules/slider': 'jquery/ui-modules/slider',
            'jquery-ui-modules/timepicker': 'jquery/ui-modules/timepicker',
            'jquery-ui-modules/widget': 'jquery/ui-modules/widget',
            'jquery/jquery-migrate': 'jquery/jquery-migrate',
            'jquery/jquery-storageapi':
                'Magento_Cookie/js/jquery.storageapi.extended',
            'jquery/jquery.cookie': 'jquery/jquery.cookie',
            'jquery/jquery.metadata': 'jquery/jquery.metadata',
            'jquery/jquery.mobile.custom': 'jquery/jquery.mobile.custom',
            'jquery/jquery.parsequery': 'jquery/jquery.parsequery',
            'jquery/jquery.storageapi.min': 'jquery/jquery.storageapi.min',
            'jquery/patches/jquery': 'jquery/patches/jquery',
            'jquery/patches/jquery-ui': 'jquery/patches/jquery-ui',
            'jquery/validate': 'jquery/jquery.validate',
            'knockoutjs/knockout': 'knockoutjs/knockout',
            'knockoutjs/knockout-es5': 'knockoutjs/knockout-es5',
            'knockoutjs/knockout-fast-foreach':
                'knockoutjs/knockout-fast-foreach',
            'knockoutjs/knockout-repeat': 'knockoutjs/knockout-repeat',
            'mage/apply/main': 'mage/apply/main',
            'mage/apply/scripts': 'mage/apply/scripts',
            'mage/bootstrap': 'mage/bootstrap',
            'mage/calendar': 'mage/calendar',
            'mage/collapsible': 'mage/collapsible',
            'mage/common': 'mage/common',
            'mage/cookies': 'mage/cookies',
            'mage/dataPost': 'mage/dataPost',
            'mage/decorate': 'mage/decorate',
            'mage/dropdown': 'mage/dropdown',
            'mage/dropdowns': 'mage/dropdowns',
            'mage/ie-class-fixer': 'mage/ie-class-fixer',
            'mage/loader': 'mage/loader',
            'mage/mage': 'mage/mage',
            'mage/menu': 'mage/menu',
            'mage/requirejs/resolver': 'mage/requirejs/resolver',
            'mage/smart-keyboard-handler': 'mage/smart-keyboard-handler',
            'mage/storage': 'mage/storage',
            'mage/tabs': 'mage/tabs',
            'mage/template': 'mage/template',
            'mage/translate': 'mage/translate',
            'mage/translate-inline': 'mage/translate-inline',
            'mage/trim-input': 'mage/trim-input',
            'mage/url': 'mage/url',
            'mage/utils/arrays': 'mage/utils/arrays',
            'mage/utils/compare': 'mage/utils/compare',
            'mage/utils/main': 'mage/utils/main',
            'mage/utils/misc': 'mage/utils/misc',
            'mage/utils/objects': 'mage/utils/objects',
            'mage/utils/strings': 'mage/utils/strings',
            'mage/utils/template': 'mage/utils/template',
            'mage/utils/wrapper': 'mage/utils/wrapper',
            'mage/validation': 'mage/validation',
            'mage/validation/validation': 'mage/validation/validation',
            matchMedia: 'matchMedia',
            moment: 'moment',
            spectrum: 'jquery/spectrum/spectrum',
            text: 'mage/requirejs/text',
            'text!Magento_Captcha/template/checkout/captcha.html':
                'Magento_Captcha/template/checkout/captcha.html',
            'text!Magento_Checkout/template/minicart/content.html':
                'Magento_Checkout/template/minicart/content.html',
            'text!Magento_Customer/template/authentication-popup.html':
                'Magento_Customer/template/authentication-popup.html',
            'text!Magento_Ui/template/messages.html':
                'Magento_Ui/template/messages.html',
            'text!js-translation.json': 'js-translation.json',
            'text!ui/template/block-loader.html':
                'Magento_Ui/templates/block-loader.html',
            'text!ui/template/collection.html':
                'Magento_Ui/templates/collection.html',
            'text!ui/template/modal/modal-custom.html':
                'Magento_Ui/templates/modal/modal-custom.html',
            'text!ui/template/modal/modal-popup.html':
                'Magento_Ui/templates/modal/modal-popup.html',
            'text!ui/template/modal/modal-slide.html':
                'Magento_Ui/templates/modal/modal-slide.html',
            'text!ui/template/tooltip/tooltip.html':
                'Magento_Ui/templates/tooltip/tooltip.html',
            tinycolor: 'jquery/spectrum/tinycolor',
            underscore: 'underscore',
        },
    },
    {
        url: '',
        name: 'category',
        modules: {
            'Magento_Catalog/js/catalog-add-to-cart':
                'Magento_Catalog/js/catalog-add-to-cart',
            'Magento_Catalog/js/product/list/toolbar':
                'Magento_Catalog/js/product/list/toolbar',
            'Magento_Catalog/js/product/view/product-ids':
                'Magento_Catalog/js/product/view/product-ids',
            'Magento_Catalog/js/product/view/product-ids-resolver':
                'Magento_Catalog/js/product/view/product-ids-resolver',
            'Magento_Catalog/js/product/view/product-info':
                'Magento_Catalog/js/product/view/product-info',
            'Magento_Catalog/js/product/view/product-info-resolver':
                'Magento_Catalog/js/product/view/product-info-resolver',
            'Magento_ConfigurableProduct/js/catalog-add-to-cart-mixin':
                'Magento_ConfigurableProduct/js/catalog-add-to-cart-mixin',
            'Magento_ConfigurableProduct/js/product/view/product-info-resolver':
                'Magento_ConfigurableProduct/js/product/view/product-info-resolver',
            'Magento_Cookie/js/require-cookie':
                'Magento_Cookie/js/require-cookie',
            'Magento_Wishlist/js/add-to-wishlist':
                'Magento_Wishlist/js/add-to-wishlist',
            'Magento_Wishlist/js/view/wishlist':
                'Magento_Wishlist/js/view/wishlist',
            'mage/accordion': 'mage/accordion',
        },
    },
    {
        url: '',
        name: 'cms',
        modules: {},
    },
    {
        url: [],
        name: 'product',
        modules: {
            'Magento_Catalog/js/catalog-add-to-cart':
                'Magento_Catalog/js/catalog-add-to-cart',
            'Magento_Catalog/js/gallery': 'Magento_Catalog/js/gallery',
            'Magento_Catalog/js/product/breadcrumbs':
                'Magento_Catalog/js/product/breadcrumbs',
            'Magento_Catalog/js/product/view/product-ids':
                'Magento_Catalog/js/product/view/product-ids',
            'Magento_Catalog/js/product/view/product-ids-resolver':
                'Magento_Catalog/js/product/view/product-ids-resolver',
            'Magento_Catalog/js/product/view/product-info':
                'Magento_Catalog/js/product/view/product-info',
            'Magento_Catalog/js/product/view/product-info-resolver':
                'Magento_Catalog/js/product/view/product-info-resolver',
            'Magento_Catalog/js/product/view/provider':
                'Magento_Catalog/js/product/view/provider',
            'Magento_Catalog/js/related-products':
                'Magento_Catalog/js/related-products',
            'Magento_Catalog/js/validate-product':
                'Magento_Catalog/js/validate-product',
            'Magento_Catalog/product/view/validation':
                'Magento_Catalog/product/view/validation',
            'Magento_ConfigurableProduct/js/catalog-add-to-cart-mixin':
                'Magento_ConfigurableProduct/js/catalog-add-to-cart-mixin',
            'Magento_ConfigurableProduct/js/product/view/product-info-resolver':
                'Magento_ConfigurableProduct/js/product/view/product-info-resolver',
            'Magento_Cookie/js/require-cookie':
                'Magento_Cookie/js/require-cookie',
            'Magento_InstantPurchase/js/view/instant-purchase':
                'Magento_InstantPurchase/js/view/instant-purchase',
            'Magento_ProductVideo/js/fotorama-add-video-events':
                'Magento_ProductVideo/js/fotorama-add-video-events',
            'Magento_ProductVideo/js/load-player':
                'Magento_ProductVideo/js/load-player',
            'Magento_Review/js/error-placement':
                'Magento_Review/js/error-placement',
            'Magento_Review/js/process-reviews':
                'Magento_Review/js/process-reviews',
            'Magento_Review/js/submit-review':
                'Magento_Review/js/submit-review',
            'Magento_Review/js/validate-review':
                'Magento_Review/js/validate-review',
            'Magento_Review/js/view/review': 'Magento_Review/js/view/review',
            'Magento_Swatches/js/catalog-add-to-cart':
                'Magento_Swatches/js/catalog-add-to-cart',
            'Magento_Theme/js/model/breadcrumb-list':
                'Magento_Theme/js/model/breadcrumb-list',
            'Magento_Theme/js/view/add-home-breadcrumb':
                'Magento_Theme/js/view/add-home-breadcrumb',
            'Magento_Theme/js/view/breadcrumbs':
                'Magento_Theme/js/view/breadcrumbs',
            'Magento_Wishlist/js/add-to-wishlist':
                'Magento_Wishlist/js/add-to-wishlist',
            'fotorama/fotorama': 'fotorama/fotorama',
            'mage/gallery/gallery': 'mage/gallery/gallery',
            'magnifier/magnifier': 'magnifier/magnifier',
            'magnifier/magnify': 'magnifier/magnify',
            'text!Magento_InstantPurchase/template/confirmation.html':
                'Magento_InstantPurchase/template/confirmation.html',
            'text!Magento_InstantPurchase/template/instant-purchase.html':
                'Magento_InstantPurchase/template/instant-purchase.html',
            'text!Magento_Theme/templates/breadcrumbs.html':
                'Magento_Theme/templates/breadcrumbs.html',
            'text!mage/gallery/gallery.html': 'mage/gallery/gallery.html',
        },
    },
    {
        url: {},
        name: 'checkout',
        modules: {
            'Magento_Catalog/js/catalog-add-to-cart':
                'Magento_Catalog/js/catalog-add-to-cart',
            'Magento_Catalog/js/product/view/product-ids':
                'Magento_Catalog/js/product/view/product-ids',
            'Magento_Catalog/js/product/view/product-ids-resolver':
                'Magento_Catalog/js/product/view/product-ids-resolver',
            'Magento_Catalog/js/product/view/product-info':
                'Magento_Catalog/js/product/view/product-info',
            'Magento_Catalog/js/product/view/product-info-resolver':
                'Magento_Catalog/js/product/view/product-info-resolver',
            'Magento_Checkout/js/action/create-billing-address':
                'Magento_Checkout/js/action/create-billing-address',
            'Magento_Checkout/js/action/create-shipping-address':
                'Magento_Checkout/js/action/create-shipping-address',
            'Magento_Checkout/js/action/get-totals':
                'Magento_Checkout/js/action/get-totals',
            'Magento_Checkout/js/action/select-billing-address':
                'Magento_Checkout/js/action/select-billing-address',
            'Magento_Checkout/js/action/select-payment-method':
                'Magento_Checkout/js/action/select-payment-method',
            'Magento_Checkout/js/action/select-shipping-address':
                'Magento_Checkout/js/action/select-shipping-address',
            'Magento_Checkout/js/action/select-shipping-method':
                'Magento_Checkout/js/action/select-shipping-method',
            'Magento_Checkout/js/action/set-payment-information':
                'Magento_Checkout/js/action/set-payment-information',
            'Magento_Checkout/js/action/set-payment-information-extended':
                'Magento_Checkout/js/action/set-payment-information-extended',
            'Magento_Checkout/js/action/update-shopping-cart':
                'Magento_Checkout/js/action/update-shopping-cart',
            'Magento_Checkout/js/checkout-data':
                'Magento_Checkout/js/checkout-data',
            'Magento_Checkout/js/discount-codes':
                'Magento_Checkout/js/discount-codes',
            'Magento_Checkout/js/model/address-converter':
                'Magento_Checkout/js/model/address-converter',
            'Magento_Checkout/js/model/cart/cache':
                'Magento_Checkout/js/model/cart/cache',
            'Magento_Checkout/js/model/cart/estimate-service':
                'Magento_Checkout/js/model/cart/estimate-service',
            'Magento_Checkout/js/model/cart/totals-processor/default':
                'Magento_Checkout/js/model/cart/totals-processor/default',
            'Magento_Checkout/js/model/checkout-data-resolver':
                'Magento_Checkout/js/model/checkout-data-resolver',
            'Magento_Checkout/js/model/default-post-code-resolver':
                'Magento_Checkout/js/model/default-post-code-resolver',
            'Magento_Checkout/js/model/default-validation-rules':
                'Magento_Checkout/js/model/default-validation-rules',
            'Magento_Checkout/js/model/default-validator':
                'Magento_Checkout/js/model/default-validator',
            'Magento_Checkout/js/model/error-processor':
                'Magento_Checkout/js/model/error-processor',
            'Magento_Checkout/js/model/full-screen-loader':
                'Magento_Checkout/js/model/full-screen-loader',
            'Magento_Checkout/js/model/new-customer-address':
                'Magento_Checkout/js/model/new-customer-address',
            'Magento_Checkout/js/model/payment-service':
                'Magento_Checkout/js/model/payment-service',
            'Magento_Checkout/js/model/payment/method-list':
                'Magento_Checkout/js/model/payment/method-list',
            'Magento_Checkout/js/model/postcode-validator':
                'Magento_Checkout/js/model/postcode-validator',
            'Magento_Checkout/js/model/quote':
                'Magento_Checkout/js/model/quote',
            'Magento_Checkout/js/model/resource-url-manager':
                'Magento_Checkout/js/model/resource-url-manager',
            'Magento_Checkout/js/model/shipping-address/form-popup-state':
                'Magento_Checkout/js/model/shipping-address/form-popup-state',
            'Magento_Checkout/js/model/shipping-rate-processor/new-address':
                'Magento_Checkout/js/model/shipping-rate-processor/new-address',
            'Magento_Checkout/js/model/shipping-rate-registry':
                'Magento_Checkout/js/model/shipping-rate-registry',
            'Magento_Checkout/js/model/shipping-rates-validation-rules':
                'Magento_Checkout/js/model/shipping-rates-validation-rules',
            'Magento_Checkout/js/model/shipping-rates-validator':
                'Magento_Checkout/js/model/shipping-rates-validator',
            'Magento_Checkout/js/model/shipping-service':
                'Magento_Checkout/js/model/shipping-service',
            'Magento_Checkout/js/model/step-navigator':
                'Magento_Checkout/js/model/step-navigator',
            'Magento_Checkout/js/model/totals':
                'Magento_Checkout/js/model/totals',
            'Magento_Checkout/js/model/url-builder':
                'Magento_Checkout/js/model/url-builder',
            'Magento_Checkout/js/proceed-to-checkout':
                'Magento_Checkout/js/proceed-to-checkout',
            'Magento_Checkout/js/shopping-cart':
                'Magento_Checkout/js/shopping-cart',
            'Magento_Checkout/js/view/cart/shipping-estimation':
                'Magento_Checkout/js/view/cart/shipping-estimation',
            'Magento_Checkout/js/view/cart/shipping-rates':
                'Magento_Checkout/js/view/cart/shipping-rates',
            'Magento_Checkout/js/view/cart/totals':
                'Magento_Checkout/js/view/cart/totals',
            'Magento_Checkout/js/view/summary/abstract-total':
                'Magento_Checkout/js/view/summary/abstract-total',
            'Magento_Checkout/js/view/summary/shipping':
                'Magento_Checkout/js/view/summary/shipping',
            'Magento_CheckoutAgreements/js/model/agreements-assigner':
                'Magento_CheckoutAgreements/js/model/agreements-assigner',
            'Magento_CheckoutAgreements/js/model/set-payment-information-mixin':
                'Magento_CheckoutAgreements/js/model/set-payment-information-mixin',
            'Magento_ConfigurableProduct/js/catalog-add-to-cart-mixin':
                'Magento_ConfigurableProduct/js/catalog-add-to-cart-mixin',
            'Magento_ConfigurableProduct/js/product/view/product-info-resolver':
                'Magento_ConfigurableProduct/js/product/view/product-info-resolver',
            'Magento_Customer/js/model/address-list':
                'Magento_Customer/js/model/address-list',
            'Magento_Customer/js/model/customer':
                'Magento_Customer/js/model/customer',
            'Magento_Customer/js/model/customer-addresses':
                'Magento_Customer/js/model/customer-addresses',
            'Magento_Customer/js/model/customer/address':
                'Magento_Customer/js/model/customer/address',
            'Magento_Dhl/js/model/shipping-rates-validation-rules':
                'Magento_Dhl/js/model/shipping-rates-validation-rules',
            'Magento_Dhl/js/model/shipping-rates-validator':
                'Magento_Dhl/js/model/shipping-rates-validator',
            'Magento_Dhl/js/view/shipping-rates-validation':
                'Magento_Dhl/js/view/shipping-rates-validation',
            'Magento_Fedex/js/model/shipping-rates-validation-rules':
                'Magento_Fedex/js/model/shipping-rates-validation-rules',
            'Magento_Fedex/js/model/shipping-rates-validator':
                'Magento_Fedex/js/model/shipping-rates-validator',
            'Magento_Fedex/js/view/shipping-rates-validation':
                'Magento_Fedex/js/view/shipping-rates-validation',
            'Magento_GiftMessage/js/action/gift-options':
                'Magento_GiftMessage/js/action/gift-options',
            'Magento_GiftMessage/js/model/gift-message':
                'Magento_GiftMessage/js/model/gift-message',
            'Magento_GiftMessage/js/model/gift-options':
                'Magento_GiftMessage/js/model/gift-options',
            'Magento_GiftMessage/js/model/url-builder':
                'Magento_GiftMessage/js/model/url-builder',
            'Magento_GiftMessage/js/view/gift-message':
                'Magento_GiftMessage/js/view/gift-message',
            'Magento_OfflineShipping/js/model/shipping-rates-validation-rules/flatrate':
                'Magento_OfflineShipping/js/model/shipping-rates-validation-rules/flatrate',
            'Magento_OfflineShipping/js/model/shipping-rates-validation-rules/freeshipping':
                'Magento_OfflineShipping/js/model/shipping-rates-validation-rules/freeshipping',
            'Magento_OfflineShipping/js/model/shipping-rates-validation-rules/tablerate':
                'Magento_OfflineShipping/js/model/shipping-rates-validation-rules/tablerate',
            'Magento_OfflineShipping/js/model/shipping-rates-validator/flatrate':
                'Magento_OfflineShipping/js/model/shipping-rates-validator/flatrate',
            'Magento_OfflineShipping/js/model/shipping-rates-validator/freeshipping':
                'Magento_OfflineShipping/js/model/shipping-rates-validator/freeshipping',
            'Magento_OfflineShipping/js/model/shipping-rates-validator/tablerate':
                'Magento_OfflineShipping/js/model/shipping-rates-validator/tablerate',
            'Magento_OfflineShipping/js/view/shipping-rates-validation/flatrate':
                'Magento_OfflineShipping/js/view/shipping-rates-validation/flatrate',
            'Magento_OfflineShipping/js/view/shipping-rates-validation/freeshipping':
                'Magento_OfflineShipping/js/view/shipping-rates-validation/freeshipping',
            'Magento_OfflineShipping/js/view/shipping-rates-validation/tablerate':
                'Magento_OfflineShipping/js/view/shipping-rates-validation/tablerate',
            'Magento_SalesRule/js/action/select-payment-method-mixin':
                'Magento_SalesRule/js/action/select-payment-method-mixin',
            'Magento_SalesRule/js/model/coupon':
                'Magento_SalesRule/js/model/coupon',
            'Magento_SalesRule/js/model/payment/discount-messages':
                'Magento_SalesRule/js/model/payment/discount-messages',
            'Magento_SalesRule/js/view/cart/totals/discount':
                'Magento_SalesRule/js/view/cart/totals/discount',
            'Magento_SalesRule/js/view/summary/discount':
                'Magento_SalesRule/js/view/summary/discount',
            'Magento_Tax/js/view/checkout/cart/totals/grand-total':
                'Magento_Tax/js/view/checkout/cart/totals/grand-total',
            'Magento_Tax/js/view/checkout/cart/totals/shipping':
                'Magento_Tax/js/view/checkout/cart/totals/shipping',
            'Magento_Tax/js/view/checkout/cart/totals/tax':
                'Magento_Tax/js/view/checkout/cart/totals/tax',
            'Magento_Tax/js/view/checkout/shipping_method/price':
                'Magento_Tax/js/view/checkout/shipping_method/price',
            'Magento_Tax/js/view/checkout/summary/grand-total':
                'Magento_Tax/js/view/checkout/summary/grand-total',
            'Magento_Tax/js/view/checkout/summary/shipping':
                'Magento_Tax/js/view/checkout/summary/shipping',
            'Magento_Tax/js/view/checkout/summary/subtotal':
                'Magento_Tax/js/view/checkout/summary/subtotal',
            'Magento_Tax/js/view/checkout/summary/tax':
                'Magento_Tax/js/view/checkout/summary/tax',
            'Magento_Ui/js/form/element/abstract':
                'Magento_Ui/js/form/element/abstract',
            'Magento_Ui/js/form/element/region':
                'Magento_Ui/js/form/element/region',
            'Magento_Ui/js/form/element/select':
                'Magento_Ui/js/form/element/select',
            'Magento_Ui/js/lib/validation/rules':
                'Magento_Ui/js/lib/validation/rules',
            'Magento_Ui/js/lib/validation/utils':
                'Magento_Ui/js/lib/validation/utils',
            'Magento_Ui/js/lib/validation/validator':
                'Magento_Ui/js/lib/validation/validator',
            'Magento_Ups/js/model/shipping-rates-validation-rules':
                'Magento_Ups/js/model/shipping-rates-validation-rules',
            'Magento_Ups/js/model/shipping-rates-validator':
                'Magento_Ups/js/model/shipping-rates-validator',
            'Magento_Ups/js/view/shipping-rates-validation':
                'Magento_Ups/js/view/shipping-rates-validation',
            'Magento_Usps/js/model/shipping-rates-validation-rules':
                'Magento_Usps/js/model/shipping-rates-validation-rules',
            'Magento_Usps/js/model/shipping-rates-validator':
                'Magento_Usps/js/model/shipping-rates-validator',
            'Magento_Usps/js/view/shipping-rates-validation':
                'Magento_Usps/js/view/shipping-rates-validation',
            'Magento_Weee/js/view/cart/totals/weee':
                'Magento_Weee/js/view/cart/totals/weee',
            'Magento_Weee/js/view/checkout/summary/weee':
                'Magento_Weee/js/view/checkout/summary/weee',
            'mage/sticky': 'mage/sticky',
            'text!Magento_Catalog/template/product/image_with_borders.html':
                'Magento_Catalog/template/product/image_with_borders.html',
            'text!Magento_Checkout/template/cart/shipping-estimation.html':
                'Magento_Checkout/template/cart/shipping-estimation.html',
            'text!Magento_Checkout/template/cart/shipping-rates.html':
                'Magento_Checkout/template/cart/shipping-rates.html',
            'text!Magento_Checkout/template/cart/totals.html':
                'Magento_Checkout/template/cart/totals.html',
            'text!Magento_Checkout/template/minicart/item/default.html':
                'Magento_Checkout/template/minicart/item/default.html',
            'text!Magento_Checkout/template/minicart/item/price.html':
                'Magento_Checkout/template/minicart/item/price.html',
            'text!Magento_Checkout/template/minicart/subtotal.html':
                'Magento_Checkout/template/minicart/subtotal.html',
            'text!Magento_GiftMessage/template/gift-message-item-level.html':
                'Magento_GiftMessage/template/gift-message-item-level.html',
            'text!Magento_GiftMessage/template/gift-message.html':
                'Magento_GiftMessage/template/gift-message.html',
            'text!Magento_SalesRule/template/cart/totals/discount.html':
                'Magento_SalesRule/template/cart/totals/discount.html',
            'text!Magento_Tax/template/checkout/cart/totals/grand-total.html':
                'Magento_Tax/template/checkout/cart/totals/grand-total.html',
            'text!Magento_Tax/template/checkout/cart/totals/shipping.html':
                'Magento_Tax/template/checkout/cart/totals/shipping.html',
            'text!Magento_Tax/template/checkout/cart/totals/tax.html':
                'Magento_Tax/template/checkout/cart/totals/tax.html',
            'text!Magento_Tax/template/checkout/minicart/subtotal/totals.html':
                'Magento_Tax/template/checkout/minicart/subtotal/totals.html',
            'text!Magento_Tax/template/checkout/shipping_method/price.html':
                'Magento_Tax/template/checkout/shipping_method/price.html',
            'text!Magento_Tax/template/checkout/summary/subtotal.html':
                'Magento_Tax/template/checkout/summary/subtotal.html',
            'text!Magento_Weee/template/checkout/summary/weee.html':
                'Magento_Weee/template/checkout/summary/weee.html',
            'text!ui/template/form/element/input.html':
                'Magento_Ui/templates/form/element/input.html',
            'text!ui/template/form/element/select.html':
                'Magento_Ui/templates/form/element/select.html',
            'text!ui/template/form/field.html':
                'Magento_Ui/templates/form/field.html',
            'Magento_Checkout/js/action/get-payment-information':
                'Magento_Checkout/js/action/get-payment-information',
            'Magento_Checkout/js/action/recollect-shipping-rates':
                'Magento_Checkout/js/action/recollect-shipping-rates',
            'Magento_Checkout/js/action/set-billing-address':
                'Magento_Checkout/js/action/set-billing-address',
            'Magento_Checkout/js/action/set-shipping-information':
                'Magento_Checkout/js/action/set-shipping-information',
            'Magento_Checkout/js/checkout-loader':
                'Magento_Checkout/js/checkout-loader',
            'Magento_Checkout/js/model/authentication-messages':
                'Magento_Checkout/js/model/authentication-messages',
            'Magento_Checkout/js/model/billing-address-postcode-validator':
                'Magento_Checkout/js/model/billing-address-postcode-validator',
            'Magento_Checkout/js/model/customer-email-validator':
                'Magento_Checkout/js/model/customer-email-validator',
            'Magento_Checkout/js/model/payment/additional-validators':
                'Magento_Checkout/js/model/payment/additional-validators',
            'Magento_Checkout/js/model/payment/method-converter':
                'Magento_Checkout/js/model/payment/method-converter',
            'Magento_Checkout/js/model/payment/method-group':
                'Magento_Checkout/js/model/payment/method-group',
            'Magento_Checkout/js/model/payment/renderer-list':
                'Magento_Checkout/js/model/payment/renderer-list',
            'Magento_Checkout/js/model/shipping-rate-processor/customer-address':
                'Magento_Checkout/js/model/shipping-rate-processor/customer-address',
            'Magento_Checkout/js/model/shipping-rate-service':
                'Magento_Checkout/js/model/shipping-rate-service',
            'Magento_Checkout/js/model/shipping-save-processor':
                'Magento_Checkout/js/model/shipping-save-processor',
            'Magento_Checkout/js/model/shipping-save-processor/default':
                'Magento_Checkout/js/model/shipping-save-processor/default',
            'Magento_Checkout/js/model/shipping-save-processor/payload-extender':
                'Magento_Checkout/js/model/shipping-save-processor/payload-extender',
            'Magento_Checkout/js/model/sidebar':
                'Magento_Checkout/js/model/sidebar',
            'Magento_Checkout/js/view/authentication':
                'Magento_Checkout/js/view/authentication',
            'Magento_Checkout/js/view/authentication-messages':
                'Magento_Checkout/js/view/authentication-messages',
            'Magento_Checkout/js/view/billing-address':
                'Magento_Checkout/js/view/billing-address',
            'Magento_Checkout/js/view/billing-address/list':
                'Magento_Checkout/js/view/billing-address/list',
            'Magento_Checkout/js/view/estimation':
                'Magento_Checkout/js/view/estimation',
            'Magento_Checkout/js/view/form/element/email':
                'Magento_Checkout/js/view/form/element/email',
            'Magento_Checkout/js/view/payment':
                'Magento_Checkout/js/view/payment',
            'Magento_Checkout/js/view/payment/email-validator':
                'Magento_Checkout/js/view/payment/email-validator',
            'Magento_Checkout/js/view/payment/list':
                'Magento_Checkout/js/view/payment/list',
            'Magento_Checkout/js/view/progress-bar':
                'Magento_Checkout/js/view/progress-bar',
            'Magento_Checkout/js/view/shipping':
                'Magento_Checkout/js/view/shipping',
            'Magento_Checkout/js/view/shipping-address/list':
                'Magento_Checkout/js/view/shipping-address/list',
            'Magento_Checkout/js/view/shipping-information':
                'Magento_Checkout/js/view/shipping-information',
            'Magento_Checkout/js/view/shipping-information/address-renderer/default':
                'Magento_Checkout/js/view/shipping-information/address-renderer/default',
            'Magento_Checkout/js/view/shipping-information/list':
                'Magento_Checkout/js/view/shipping-information/list',
            'Magento_Checkout/js/view/sidebar':
                'Magento_Checkout/js/view/sidebar',
            'Magento_Checkout/js/view/summary':
                'Magento_Checkout/js/view/summary',
            'Magento_Checkout/js/view/summary/cart-items':
                'Magento_Checkout/js/view/summary/cart-items',
            'Magento_Checkout/js/view/summary/item/details':
                'Magento_Checkout/js/view/summary/item/details',
            'Magento_Checkout/js/view/summary/item/details/message':
                'Magento_Checkout/js/view/summary/item/details/message',
            'Magento_Checkout/js/view/summary/item/details/subtotal':
                'Magento_Checkout/js/view/summary/item/details/subtotal',
            'Magento_Checkout/js/view/summary/item/details/thumbnail':
                'Magento_Checkout/js/view/summary/item/details/thumbnail',
            'Magento_Checkout/js/view/summary/totals':
                'Magento_Checkout/js/view/summary/totals',
            'Magento_CheckoutAgreements/js/model/agreement-validator':
                'Magento_CheckoutAgreements/js/model/agreement-validator',
            'Magento_CheckoutAgreements/js/model/agreements-modal':
                'Magento_CheckoutAgreements/js/model/agreements-modal',
            'Magento_CheckoutAgreements/js/view/agreement-validation':
                'Magento_CheckoutAgreements/js/view/agreement-validation',
            'Magento_CheckoutAgreements/js/view/checkout-agreements':
                'Magento_CheckoutAgreements/js/view/checkout-agreements',
            'Magento_Customer/js/action/check-email-availability':
                'Magento_Customer/js/action/check-email-availability',
            'Magento_OfflinePayments/js/view/payment/offline-payments':
                'Magento_OfflinePayments/js/view/payment/offline-payments',
            'Magento_Payment/js/view/payment/payments':
                'Magento_Payment/js/view/payment/payments',
            'Magento_Paypal/js/view/payment/paypal-payments':
                'Magento_Paypal/js/view/payment/paypal-payments',
            'Magento_PaypalCaptcha/js/view/checkout/paymentCaptcha':
                'Magento_PaypalCaptcha/js/view/checkout/paymentCaptcha',
            'Magento_PaypalCaptcha/js/view/payment/list-mixin':
                'Magento_PaypalCaptcha/js/view/payment/list-mixin',
            'Magento_SalesRule/js/action/cancel-coupon':
                'Magento_SalesRule/js/action/cancel-coupon',
            'Magento_SalesRule/js/action/set-coupon-code':
                'Magento_SalesRule/js/action/set-coupon-code',
            'Magento_SalesRule/js/view/payment/captcha':
                'Magento_SalesRule/js/view/payment/captcha',
            'Magento_SalesRule/js/view/payment/discount':
                'Magento_SalesRule/js/view/payment/discount',
            'Magento_SalesRule/js/view/payment/discount-messages':
                'Magento_SalesRule/js/view/payment/discount-messages',
            'Magento_Shipping/js/model/config':
                'Magento_Shipping/js/model/config',
            'Magento_Shipping/js/view/checkout/shipping/shipping-policy':
                'Magento_Shipping/js/view/checkout/shipping/shipping-policy',
            'Magento_Tax/js/view/checkout/summary/item/details/subtotal':
                'Magento_Tax/js/view/checkout/summary/item/details/subtotal',
            'Magento_Ui/js/form/components/group':
                'Magento_Ui/js/form/components/group',
            'Magento_Ui/js/form/element/post-code':
                'Magento_Ui/js/form/element/post-code',
            'Magento_Weee/js/view/checkout/summary/item/price/row_excl_tax':
                'Magento_Weee/js/view/checkout/summary/item/price/row_excl_tax',
            'Magento_Weee/js/view/checkout/summary/item/price/row_incl_tax':
                'Magento_Weee/js/view/checkout/summary/item/price/row_incl_tax',
            'Magento_Weee/js/view/checkout/summary/item/price/weee':
                'Magento_Weee/js/view/checkout/summary/item/price/weee',
            'text!Magento_Checkout/template/authentication.html':
                'Magento_Checkout/template/authentication.html',
            'text!Magento_Checkout/template/estimation.html':
                'Magento_Checkout/template/estimation.html',
            'text!Magento_Checkout/template/form/element/email.html':
                'Magento_Checkout/template/form/element/email.html',
            'text!Magento_Checkout/template/onepage.html':
                'Magento_Checkout/template/onepage.html',
            'text!Magento_Checkout/template/payment-methods/list.html':
                'Magento_Checkout/template/payment-methods/list.html',
            'text!Magento_Checkout/template/payment.html':
                'Magento_Checkout/template/payment.html',
            'text!Magento_Checkout/template/progress-bar.html':
                'Magento_Checkout/template/progress-bar.html',
            'text!Magento_Checkout/template/shipping-address/form.html':
                'Magento_Checkout/template/shipping-address/form.html',
            'text!Magento_Checkout/template/shipping-address/list.html':
                'Magento_Checkout/template/shipping-address/list.html',
            'text!Magento_Checkout/template/shipping-address/shipping-method-item.html':
                'Magento_Checkout/template/shipping-address/shipping-method-item.html',
            'text!Magento_Checkout/template/shipping-address/shipping-method-list.html':
                'Magento_Checkout/template/shipping-address/shipping-method-list.html',
            'text!Magento_Checkout/template/shipping-information.html':
                'Magento_Checkout/template/shipping-information.html',
            'text!Magento_Checkout/template/shipping.html':
                'Magento_Checkout/template/shipping.html',
            'text!Magento_Checkout/template/sidebar.html':
                'Magento_Checkout/template/sidebar.html',
            'text!Magento_Checkout/template/summary.html':
                'Magento_Checkout/template/summary.html',
            'text!Magento_Checkout/template/summary/cart-items.html':
                'Magento_Checkout/template/summary/cart-items.html',
            'text!Magento_Checkout/template/summary/item/details.html':
                'Magento_Checkout/template/summary/item/details.html',
            'text!Magento_Checkout/template/summary/item/details/message.html':
                'Magento_Checkout/template/summary/item/details/message.html',
            'text!Magento_Checkout/template/summary/item/details/thumbnail.html':
                'Magento_Checkout/template/summary/item/details/thumbnail.html',
            'text!Magento_Checkout/template/summary/totals.html':
                'Magento_Checkout/template/summary/totals.html',
            'text!Magento_SalesRule/template/payment/discount.html':
                'Magento_SalesRule/template/payment/discount.html',
            'text!Magento_Shipping/template/checkout/shipping/shipping-policy.html':
                'Magento_Shipping/template/checkout/shipping/shipping-policy.html',
            'text!Magento_Tax/template/checkout/summary/item/details/subtotal.html':
                'Magento_Tax/template/checkout/summary/item/details/subtotal.html',
            'text!Magento_Weee/template/checkout/summary/item/price/row_excl_tax.html':
                'Magento_Weee/template/checkout/summary/item/price/row_excl_tax.html',
            'text!ui/template/form/element/helper/tooltip.html':
                'Magento_Ui/templates/form/element/helper/tooltip.html',
            'text!ui/template/group/group.html':
                'Magento_Ui/templates/group/group.html',
        },
    },
];
