/*global Meteor, Mongo */

let GroupTopics = {}

if (Meteor.isClient) {
  GroupTopics = new Mongo.Collection("groupTopics")
}

if (Meteor.isServer) {
  GroupTopics = new Mongo.Collection(null)
}

export default GroupTopics
