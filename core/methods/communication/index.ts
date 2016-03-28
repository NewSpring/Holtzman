let communication;

if (Meteor.isClient) {
  communication = require("./client")
}

if (Meteor.isServer) {
  communication = require("./server")
}

export default communication
