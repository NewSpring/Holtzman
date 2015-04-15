Apollos.transactionDetails = new Mongo.Collection "transactionDetails"

detail = Apollos.generateSchema
  transactionDetailId:
    type: Number
    decimal: false
  transactionId:
    type: Number
    decimal: false
  accountId:
    type: Number
    decimal: false
  guid:
    type: String
    optional: false
    regEx: Apollos.regex.guid
  amount:
    type: Number
    decimal: true

Apollos.transactionDetails.attachSchema detail
