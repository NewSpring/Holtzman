
let Transactions = {}
let TransactionReciepts = {}

if (Meteor.isClient) {
  Transactions = new Mongo.Collection("transactions")
}

if (Meteor.isServer) {
  Transactions = new Mongo.Collection(null)
  TransactionReciepts = new Mongo.Collection("transactionReciepts")
}

export { TransactionReciepts }
export default Transactions
