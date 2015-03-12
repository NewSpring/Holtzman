Apollos.transactions = new Mongo.Collection "transactions"

# Maps to Rock:FinancialTransaction, Rock:FinancialTransactionDetail
transaction = new SimpleSchema(
  transactionId:
    type: Number
  scheduledTransactionId:
    type: Number
  personAliasId:
    type: Number
  fundId:
    type: Number
  fundName:
    type: String
  fundAmount:
    type: Number
  transactionCode:
    type: String
  totalAmount:
    type: Number
  name:
    type: String
    label: "Summary of the transaction passed from Rock"
  source:
    type: String
    regEx: /^(Website|Kiosk|Mobile|Onsite)$/
  accountMask:
    type: String
  currencyType:
    type: String
    regEx: /^(Credit Card|ACH|Cash|Check)$/
  creditCardType:
    type: String
    regEx: /^(Visa|MasterCard|AmEx|Discover|Diner's|JCB)$/
  submittedDate:
    type: Date
  processedDate:
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


Apollos.transactions.attachSchema transaction
