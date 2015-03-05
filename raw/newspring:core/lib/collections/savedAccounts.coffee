@.SavedAccounts = new Mongo.Collection("savedAccounts");


###

  @property [SavedAccount] All the fields for a saved account
  Mapped to Rock:FinancialPersonBankAccount, Rock:FinancialPersonSavedAccount
  Currency Types: Credit Card, ACH
  Credit Types: Visa, MasterCard, AmEx, Discover, Diner's, JCB

###
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
  creditCardType:
    type: String
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


@.SavedAccounts.attachSchema savedAccount
