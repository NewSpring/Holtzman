###

  The theme of this file is to provide methods that make Apollos (the core
  part since we're within the core package) do something

###

Apollos.name = "Apollos"


Apollos.user = ->
  user = Meteor.user()

  if !user
    user = {}

  return user



Apollos.user.create = (email, password, callback) ->

  debug email

  Accounts.createUser
    email: email
    password: password
  ,
    callback

  return




Apollos.users = Meteor.users
