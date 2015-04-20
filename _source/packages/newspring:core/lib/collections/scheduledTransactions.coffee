Apollos.scheduledTransactions = new Mongo.Collection "scheduledTransactions"

scheduledTransaction = Apollos.generateSchema
  scheduledTransactionId:
    type: Number
  personAliasId:
    type: Number
  frequencyId:
    type: Number
  frequencyType:
    type: String
    regEx: /^(Once|Weekly|Biweekly|Twice Monthly|Monthly|Quarterly|Yearly)$/
  futureTransaction:
    type: @Transaction
    label: "Information for the next scheduled occurrence"
  isEnabled:
    type: Boolean
  startDate:
    type: Date
  endDate:
    type: Date
  nextPayment:
    type: Date
  paymentExpiration:
    type: Date

Apollos.scheduledTransactions.attachSchema scheduledTransaction
