Apollos.transactions = new Mongo.Collection "transactions"


###

  @property [Transaction] All the fields for a single transaction
  Mapped to Rock:FinancialTransaction, Rock:FinancialTransactionDetail
  Currency Types: Credit Card, ACH, Cash, Check
  Credit Types: Visa, MasterCard, AmEx, Discover, Diner's, JCB
  Name: Usually a summary of the transaction passed from Rock
  Source: Website, Kiosk, Mobile, Onsite


###
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
  source:
    type: String
  accountMask:
    type: String
  currencyType:
    type: String
  creditCardType:
    type: String
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
