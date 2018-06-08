"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name PayPal
 * @description
 * PayPal plugin for Cordova/Ionic Applications
 *
 * @usage
 * ```
 * import {PayPal} from 'ionic-native';
 *
 * PayPal.init({
 *      "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
       "PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
       })
 *   .then(onSuccess)
 *   .catch(onError);
 *
 * ```
 * @interfaces
 * PayPalEnvironment
 * PayPalConfigurationOptions
 * @classes
 * PayPalPayment
 * PayPalItem
 * PayPalPaymentDetails
 * PayPalShippingAddress
 */
var PayPal = (function () {
    function PayPal() {
    }
    /**
     * You must preconnect to PayPal to prepare the device for processing payments.
     * This improves the user experience, by making the presentation of the
     * UI faster. The preconnect is valid for a limited time, so
     * the recommended time to preconnect is on page load.
     *
     * @param {String} environment available options are "PayPalEnvironmentNoNetwork", "PayPalEnvironmentProduction" and "PayPalEnvironmentSandbox"
     * @param {PayPalConfiguration} configuration For Future Payments merchantName, merchantPrivacyPolicyURL and merchantUserAgreementURL must be set be set
     */
    PayPal.init = function (environment, configuration) { return; };
    /**
     * Retreive the version of PayPal iOS SDK Library.
     */
    PayPal.version = function () { return; };
    /**
     * Start PayPal UI to collect payment from the user.
     * See https://developer.paypal.com/webapps/developer/docs/integration/mobile/ios-integration-guide/
     * for more documentation of the params.
     *
     * @param {PayPalPayment} payment PayPalPayment object
     */
    PayPal.renderSinglePaymentUI = function (payment) { return; };
    /**
     * Once a user has consented to future payments, when the user subsequently initiates a PayPal payment
     * from their device to be completed by your server, PayPal uses a Correlation ID to verify that the
     * payment is originating from a valid, user-consented device+application.
     * This helps reduce fraud and decrease declines.
     * This method MUST be called prior to initiating a pre-consented payment (a "future payment") from a mobile device.
     * Pass the result to your server, to include in the payment request sent to PayPal.
     * Do not otherwise cache or store this value.
     */
    PayPal.clientMetadataID = function () { return; };
    /**
     * Please Read Docs on Future Payments at https://github.com/paypal/PayPal-iOS-SDK#future-payments
     */
    PayPal.renderFuturePaymentUI = function () { return; };
    /**
     * Please Read Docs on Profile Sharing at https://github.com/paypal/PayPal-iOS-SDK#profile-sharing
     *
     * @param {Array<string>} scopes scopes Set of requested scope-values. Accepted scopes are: openid, profile, address, email, phone, futurepayments and paypalattributes
     * See https://developer.paypal.com/docs/integration/direct/identity/attributes/ for more details
     **/
    PayPal.renderProfileSharingUI = function (scopes) { return; };
    __decorate([
        plugin_1.Cordova()
    ], PayPal, "init", null);
    __decorate([
        plugin_1.Cordova()
    ], PayPal, "version", null);
    __decorate([
        plugin_1.Cordova()
    ], PayPal, "renderSinglePaymentUI", null);
    __decorate([
        plugin_1.Cordova()
    ], PayPal, "clientMetadataID", null);
    __decorate([
        plugin_1.Cordova()
    ], PayPal, "renderFuturePaymentUI", null);
    __decorate([
        plugin_1.Cordova()
    ], PayPal, "renderProfileSharingUI", null);
    PayPal = __decorate([
        plugin_1.Plugin({
            plugin: 'com.paypal.cordova.mobilesdk',
            pluginRef: 'PayPalMobile',
            repo: 'https://github.com/paypal/PayPal-Cordova-Plugin'
        })
    ], PayPal);
    return PayPal;
}());
exports.PayPal = PayPal;
/**
 * @private
 */
var PayPalPayment = (function () {
    /**
     * Convenience constructor.
     * Returns a PayPalPayment with the specified amount, currency code, and short description.
     * @param {String} amount: The amount of the payment.
     * @param {String} currency: The ISO 4217 currency for the payment.
     * @param {String} shortDescription: A short description of the payment.
     * @param {String} intent: "Sale" for an immediate payment.
     */
    function PayPalPayment(amount, currency, shortDescription, intent) {
        /**
         * Optional Build Notation code ("BN code"), obtained from partnerprogram@paypal.com,
         * for your tracking purposes.
         */
        this.bnCode = 'PhoneGap_SP';
        this.amount = amount;
        this.currency = currency;
        this.shortDescription = shortDescription;
        this.intent = intent;
    }
    return PayPalPayment;
}());
exports.PayPalPayment = PayPalPayment;
/**
 * @private
 */
var PayPalItem = (function () {
    /**
     * The PayPalItem class defines an optional itemization for a payment.
     * @see https://developer.paypal.com/docs/api/#item-object for more details.
     * @param {String} name: Name of the item. 127 characters max
     * @param {Number} quantity: Number of units. 10 characters max.
     * @param {String} price: Unit price for this item 10 characters max.
     * May be negative for "coupon" etc
     * @param {String} currency: ISO standard currency code.
     * @param {String} sku: The stock keeping unit for this item. 50 characters max (optional)
     */
    function PayPalItem(name, quantity, price, currency, sku) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
        this.sku = sku;
    }
    return PayPalItem;
}());
exports.PayPalItem = PayPalItem;
/**
 * @private
 */
var PayPalPaymentDetails = (function () {
    /**
     * The PayPalPaymentDetails class defines optional amount details.
     * @param {String} subtotal: Sub-total (amount) of items being paid for. 10 characters max with support for 2 decimal places.
     * @param {String} shipping: Amount charged for shipping. 10 characters max with support for 2 decimal places.
     * @param {String} tax: Amount charged for tax. 10 characters max with support for 2 decimal places.
     */
    function PayPalPaymentDetails(subtotal, shipping, tax) {
        this.subtotal = subtotal;
        this.shipping = shipping;
        this.tax = tax;
    }
    return PayPalPaymentDetails;
}());
exports.PayPalPaymentDetails = PayPalPaymentDetails;
/**
 * @private
 */
var PayPalConfiguration = (function () {
    /**
     * You use a PayPalConfiguration object to configure many aspects of how the SDK behaves.
     * see defaults for options available
     */
    function PayPalConfiguration(options) {
        var defaults = {
            defaultUserEmail: null,
            defaultUserPhoneCountryCode: null,
            defaultUserPhoneNumber: null,
            merchantName: null,
            merchantPrivacyPolicyURL: null,
            merchantUserAgreementURL: null,
            acceptCreditCards: true,
            payPalShippingAddressOption: 0,
            rememberUser: true,
            languageOrLocale: null,
            disableBlurWhenBackgrounding: false,
            presentingInPopover: false,
            forceDefaultsInSandbox: false,
            sandboxUserPassword: null,
            sandboxUserPin: null
        };
        if (options && typeof options === 'object') {
            for (var i in options) {
                if (defaults.hasOwnProperty(i)) {
                    defaults[i] = options[i];
                }
            }
        }
        return defaults;
    }
    return PayPalConfiguration;
}());
exports.PayPalConfiguration = PayPalConfiguration;
/**
 * @private
 */
var PayPalShippingAddress = (function () {
    /**
     * See the documentation of the individual properties for more detail.
     * @param {String} recipientName: Name of the recipient at this address. 50 characters max.
     * @param {String} line1: Line 1 of the address (e.g., Number, street, etc). 100 characters max.
     * @param {String} line2: Line 2 of the address (e.g., Suite, apt #, etc). 100 characters max. Optional.
     * @param {String} city: City name. 50 characters max.
     * @param {String} state: 2-letter code for US states, and the equivalent for other countries. 100 characters max. Required in certain countries.
     * @param {String} postalCode: ZIP code or equivalent is usually required for countries that have them. 20 characters max. Required in certain countries.
     * @param {String} countryCode: 2-letter country code. 2 characters max.
     */
    function PayPalShippingAddress(recipientName, line1, line2, city, state, postalCode, countryCode) {
        this.recipientName = recipientName;
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.countryCode = countryCode;
    }
    return PayPalShippingAddress;
}());
exports.PayPalShippingAddress = PayPalShippingAddress;
//# sourceMappingURL=pay-pal.js.map