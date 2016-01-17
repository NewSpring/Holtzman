
/*global Meteor*/

if (Meteor.isClient) {
  require("velocity-animate")
  require("velocity-animate/velocity.ui")
  Meteor.subscribe("person")
  Meteor.subscribe("campuses")
}
