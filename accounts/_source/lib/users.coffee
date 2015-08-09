Apollos.users = Meteor.users

if Meteor.isServer
  Apollos.api.addEndpoint "users", "user"
