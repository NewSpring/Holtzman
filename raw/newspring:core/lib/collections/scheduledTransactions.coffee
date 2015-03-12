Apollos.scheduledTransactions = new Mongo.Collection "scheduledTransactions"

# Maps to Rock:ScheduledTransaction, Rock:ScheduledTransactionDetail
scheduledTransaction = new SimpleSchema(
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

Apollos.scheduledTransactions.attachSchema scheduledTransaction
