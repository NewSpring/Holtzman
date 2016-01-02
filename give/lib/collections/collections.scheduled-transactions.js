
let ScheduledTransactions = {}
let ScheduledTransactionReciepts = {}
if (Meteor.isClient) {
  ScheduledTransactions = new Mongo.Collection("scheduledTransactions")
}

if (Meteor.isServer) {
  ScheduledTransactions = new Mongo.Collection(null)
  ScheduledTransactionReciepts = new Mongo.Collection("scheduledTransactionReciepts")
}

export { ScheduledTransactionReciepts }

export default ScheduledTransactions
