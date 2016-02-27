
let auth;

if (Meteor.isClient) {
  auth = require("./client")
}

if (Meteor.isServer) {
  auth = require("./server")
}

export default auth
