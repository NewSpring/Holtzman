
let Transactions = {}

if (Meteor.isClient) {
  Transactions = new Mongo.Collection("transactions")
}

if (Meteor.isServer) {
  Transactions = new Mongo.Collection(null)
}

export default Transactions
