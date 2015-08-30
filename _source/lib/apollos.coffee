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
Apollos.user = (id) ->

  if Meteor.isServer
    return {}

  if Meteor.isClient
    user = Meteor.user()

  return user or {}


Apollos.user.login = {}

if Meteor.isClient
  Meteor.subscribe "currentUserPerson"
else
  Meteor.publish "currentUserPerson", ->
    user = Apollos.users.findOne @.userId
    query = {}
    queryOk = false

    if not user
      return

    if user.personGuid
      query.guid = new RegExp(user.personGuid, "i")
      queryOk = true

    # we need to move the rock stuff out of this package
    if user.rock and user.rock.personId
      query.personId = user.rock.personId
      queryOk = true

    if not queryOk
      return

    return Apollos.people.find query


###

  Apollos.person

  @example get the currently logged in user's person document

    console.log "Hello, #{Apollos.person().firstName}"

###
Apollos.person = (user) ->

  if Meteor.isServer
    if not user?._id
      throw new Meteor.Error ("user is requried for server lookup")
      return

  if Meteor.isClient
    user or= Apollos.user()

  if user.personGuid
    person = Apollos.people.findOne
      guid: new RegExp(user.personGuid, "i")

  # we shouldnt have any code for rock in the core package
  # this will probably need to adjust the rock package

  # if not person and user.rock and user.rock.personId
  #   person = Apollos.people.findOne
  #     personId: user.rock.personId

  return person or {}






if Meteor.server
  Accounts.onCreateUser (options, user) ->

    user.updatedBy or= Apollos.name

    if options.profile
      user.profile = options.profile

    if user.profile?.guest is true
      return user

    email = user.emails[0].address

    Meteor.setTimeout ->
      user = Apollos.users.findOne "emails.address": email
      person = Apollos.person user

      # # no existing user so create one
      if not Object.keys(person).length
        if not user.personGuid
          personGuid = Apollos.utilities.makeNewGuid()
          Apollos.users.update user._id,
            $set:
              personGuid: personGuid
              updatedBy: Apollos.name

        queryOrArray = []

        if user.rock?.personId
          queryOrArray.push
            personId: user.rock.personId

        if personGuid
          queryOrArray.push
            guid: RegExp(personGuid, "i")

        if not queryOrArray.length
          return user

        existing = Apollos.people.findOne
          $or: queryOrArray

        if existing
          Apollos.people.update existing._id,
            $set:
              guid: personGuid
              personId: user.rock?.personId
              preferredEmail: user.emails[0].address
              updatedBy: Apollos.name
        else
          Apollos.people.insert
            guid: personGuid
            personId: user.rock?.personId
            preferredEmail: user.emails[0].address
            updatedBy: Apollos.name
    , 1000

    return user

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

  Accounts.createUser
    email: email
    password: password
  ,
    callback

###

  Apollos.user.forgotPassword

  @example request a forgot password email

    Apollos.user.forgotPassword "xyz@abc.cc", (error) ->
      if error
        console.log error

  @param email is the email address for the user to use to login with
  @param callback is the function that will be called with an error if so

###
Apollos.user.forgotPassword = (email, callback) ->

  return Accounts.forgotPassword
    email: email
  ,
    callback

###

  Apollos.user.resetPassword

  @example changes password using reset token

    Apollos.user.resetPassword token, newPassword, (error) ->
      if error
        console.log error

  @param token is the reset token emailed to the user
  @param newPassword is what to change the password to
  @param callback is the function that will be called with an error if so

###
Apollos.user.resetPassword = (token, newPassword, callback) ->

  return Accounts.resetPassword token, newPassword, callback


###

  Apollos.user.changePassword

  @example changes password using old password

    Apollos.user.changePassword oldPassword, newPassword, (error) ->
      if error
        console.log error

  @param oldPassword is the user's current password
  @param newPassword is what to change the password to
  @param callback is the function that will be called with an error if so

###
Apollos.user.changePassword = (oldPassword, newPassword, callback) ->

  if Meteor.isServer
    Apollos.users.update
      _id: @.userId
    ,
      $set:
        updatedBy: Apollos.name
  else
    Meteor.call "Apollos.user.changePassword", oldPassword, newPassword, ->
      Accounts.changePassword oldPassword, newPassword, callback

if Meteor.isServer
  Meteor.methods
    "Apollos.user.changePassword": Apollos.user.changePassword

  # TODO this is not secure
  Apollos.emailTemplates = Accounts.emailTemplates
