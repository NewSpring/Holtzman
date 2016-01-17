/*global Meteor, Mongo */

let People = {}

if (Meteor.isClient) {
  People = new Mongo.Collection("people")
}

if (Meteor.isServer) {
  People = new Mongo.Collection(null)
}

export default People
