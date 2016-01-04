/*global Meteor, Mongo */

let Campuses = {}

if (Meteor.isClient) {
  Campuses = new Mongo.Collection('campuses')
}

if (Meteor.isServer) {
  Campuses = new Mongo.Collection(null)
}

export default Campuses
