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
  transactionDateTime:
    type: Date

Apollos.transactions.attachSchema transaction
