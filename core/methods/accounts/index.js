
let accounts;

if (Meteor.isClient) {
  accounts = require("./client")
}

if (Meteor.isServer) {
  accounts = require("./server")
}

export default accounts
