/*

  @TODO: Move to NewSpring/apollos-give
 */
var savedAccount;

Apollos.savedAccounts = new Mongo.Collection("savedAccounts");

savedAccount = Apollos.generateSchema({
    savedAccountId: {
        type: Number
    },
    personAliasId: {
        type: Number
    },
    name: {
        type: String
    },
    accountMask: {
        type: String
    },
    currencyType: {
        type: String,
        regEx: /^(Credit Card|ACH)$/
    },
    creditCardType: {
        type: String,
        regEx: /^(Visa|MasterCard|AmEx|Discover|Diner's|JCB)$/
    },
    isEnabled: {
        type: Boolean,
        defaultValue: true
    },
    paymentExpiration: {
        type: Date
    }
});

Apollos.savedAccounts.attachSchema(savedAccount);