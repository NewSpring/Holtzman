
let paymentAccounts;

if (Meteor.isClient) {
  paymentAccounts = {}
}

if (Meteor.isServer) {
  paymentAccounts = require("./server")
}

export default paymentAccounts
