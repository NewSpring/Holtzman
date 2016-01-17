
let give;

if (Meteor.isClient) {
  give = {}
}

if (Meteor.isServer) {
  give = require("./server")
}

export default give
