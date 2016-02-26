
let auth;

if (Meteor.isClient) {
  auth = require("./client")
}

if (Meteor.isServer) {
  auth = require("./server")
}
console.log("HERE")

export default auth
