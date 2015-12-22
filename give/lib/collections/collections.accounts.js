
let Accounts = {}

if (Meteor.isClient) {
  Accounts = new Mongo.Collection("accounts")
}

if (Meteor.isServer) {
  Accounts = new Mongo.Collection(null)
}

export default Accounts
