

###

  @TODO: Move to NewSpring/apollos-give

###

Apollos.transactions = new Mongo.Collection "transactions"

transaction = Apollos.generateSchema
  transactionId:
    type: Number
    decimal: false
  guid:
    type: String
    regEx: Apollos.regex.guid
  sourceTypeValueId:
    type: Number
    decimal: false
  creditCardTypeValueId:
    type: Number
    decimal: false
    optional: true
  currencyTypeValueId:
    type: Number
    decimal: false
    optional: true
  transactionDateTime:
    type: Date
    optional: true

Apollos.transactions.attachSchema transaction
