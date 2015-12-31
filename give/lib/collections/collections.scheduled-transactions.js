
let ScheduledTransactions = {}

if (Meteor.isClient) {
  ScheduledTransactions = new Mongo.Collection("scheduledTransactions")
}

if (Meteor.isServer) {
  ScheduledTransactions = new Mongo.Collection(null)
}

export default ScheduledTransactions
