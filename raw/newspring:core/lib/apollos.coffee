###

  Apollos.name

  @example get a string with the name of this system

    console.log Apollos.name

###
Apollos.name = "Apollos"

###

  Apollos.user

  @example get the currently logged in user

    console.log Apollos.user()._id

###
Apollos.user = ->

  user = Meteor.user()
  return user or {}

###

  Apollos.user

  @example get the currently logged in user's person document

    console.log "Hello, #{Apollos.person().firstName}"

###
Apollos.person = ->

  userDoc = Apollos.user()

  if userDoc and userDoc.rock
    personId = userDoc.rock.personId

  if personId
    person = Apollos.people.findOne
      personId: personId

  return person or {}

###

  Apollos.user.create

  @example create a new user

    Apollos.user.create "xyz@abc.cc", "password1", (error) ->
      if error
        console.log error

  @param email is the email address for the user to use to login with
  @param password is the plain-text password the user will authenticate with
  @param callback is the function that will be called with an error if so

###
Apollos.user.create = (email, password, callback) ->

  return Accounts.createUser
    email: email
    password: password
  ,
    callback
