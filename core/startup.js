
/*global Meteor*/
import "./util/regex"

if (Meteor.isClient) {
  require("velocity-animate")
  require("velocity-animate/velocity.ui")
  Meteor.subscribe("sections")
  // Meteor.subscribe("campuses")
}

if (Meteor.isServer) {
  require("./graphql/server")
  require("./publications")
}
