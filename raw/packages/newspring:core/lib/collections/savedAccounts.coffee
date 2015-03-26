Apollos.savedAccounts = new Mongo.Collection "savedAccounts"

# Maps to Rock:FinancialPersonBankAccount, Rock:FinancialPersonSavedAccount
savedAccount = new SimpleSchema(
  savedAccountId:
    type: Number
  personAliasId:
    type: Number
  name:
    type: String
  accountMask:
    type: String
  currencyType:
    type: String
    regEx: /^(Credit Card|ACH)$/
  creditCardType:
    type: String
    regEx: /^(Visa|MasterCard|AmEx|Discover|Diner's|JCB)$/
  isEnabled:
    type: Boolean
    defaultValue: true
  paymentExpiration:
    type: Date
  createdDate:
    type: Date
    autoValue: ->
      if @.isInsert
        return new Date
      else if @.isUpsert
        return $setOnInsert: new Date
      else
        @.unset()
  updatedDate:
    type: Date
    autoValue: ->
      return new Date
)

Apollos.savedAccounts.attachSchema savedAccount
