Apollos.name = "Apollos"


Apollos.createUser = (email, password, callback) ->

  if not Meteor.isClient
    callback = undefined

  Accounts.createUser
    email: email
    password: password
  ,
    callback
