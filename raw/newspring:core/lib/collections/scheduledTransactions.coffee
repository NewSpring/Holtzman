Apollos.scheduledTransactions = new Mongo.Collection "scheduledTransactions"


###

  @property [ScheduledTransaction] All the fields for
    a scheduled/recurring transaction
  Mapped to Rock:ScheduledTransaction,
    Rock:ScheduledTransactionDetail
  Frequency Types: Once, Weekly, Biweekly, Twice Monthly,
    Monthly, Quarterly, Yearly
  Future Transaction: Holds transaction information for
    the next scheduled occurrence

###
scheduledTransaction = new SimpleSchema(
  scheduledTransactionId:
    type: Number
  personAliasId:
    type: Number
  frequencyId:
    type: Number
  frequencyType:
    type: String
  futureTransaction:
    type: @Transaction
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
