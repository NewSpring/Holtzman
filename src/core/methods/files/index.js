
let files;

if (Meteor.isClient) {
  files = require("./client")
}

if (Meteor.isServer) {
  files = require("./server")
}

export default files
