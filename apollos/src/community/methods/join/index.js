
let join;

if (Meteor.isClient) {
  join = require("./client")
}

if (Meteor.isServer) {
  join = require("./server")
}

export default join
