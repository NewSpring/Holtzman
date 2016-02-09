
let routing;

if (Meteor.isClient) {
  routing = require("./client")
}

if (Meteor.isServer) {
  routing = require("./server")
}

export default routing
