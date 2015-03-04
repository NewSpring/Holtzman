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


Meteor.methods({
  "foobar": () ->
    return Meteor.users.find().count()
})

Apollos.user.create = (email, password, callback) ->

  debug email

  if !Meteor.isClient
    cb = undefined
  else
    cb = (err) ->
      callback(err)

  Accounts.createUser
    email: email
    password: password
  ,
    cb

  return




Apollos.users = Meteor.users
