Apollos.name = "Apollos"


Apollos.createUser = (email, password, callback) ->

  __utils__.echo "create user"
  if !Meteor.isClient
    callback = undefined

  Accounts.createUser
    email: email
    password: password
  ,
    callback

  __utils__.echo Meteor.users.find().count()
  return
