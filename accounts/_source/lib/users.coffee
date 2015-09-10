Apollos.users = Meteor.users

if Meteor.isServer and Apollos.api
  Apollos.api.addEndpoint "users", "user"
