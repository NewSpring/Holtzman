###

  The theme of this file is to provide methods that make Apollos (the core
  part since we're within the core package) do something

###

Apollos.name = "Apollos"


Apollos.user = ->

  user = Meteor.user()
  return user or {}


Apollos.person = ->

  userDoc = Apollos.user()

  if userDoc and userDoc.rock
    personId = userDoc.rock.personId

  if personId
    person = Apollos.people.findOne
      personId: personId

  return person or {}


Apollos.user.create = (email, password, callback) ->

  debug email

  return Accounts.createUser
    email: email
    password: password
  ,
    callback
