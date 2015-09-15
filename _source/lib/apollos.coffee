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
    user = Meteor.users.findOne id

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

  # TODO we shouldnt have any code for rock in the core package
  # this will probably need to adjust the rock package

  # PersonGuid would fall into the same category.  The only difference is that
  # it doesn't live under the rock object, though it should.
  # In fact, all relationships are made through Rock Ids and guids, which means
  # all relationships need to be resolved within apollos-rock
  if not person and user.rock?.personId
    person = Apollos.people.findOne
      personId: user.rock.personId

  return person or {}

if Meteor.server
  Apollos.user.onCreate = (func) ->
    Apollos.user.onCreate.functions.push func

  Apollos.user.onCreate.functions = []

  Accounts.onCreateUser (options, user) ->

    user.updatedBy or= Apollos.name

    if options.profile
      user.profile = options.profile

    for func in Apollos.user.onCreate.functions
      func options, user

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
    , (error) ->
      if error
        Apollos.debug error

      if callback
        callback()

  else
    Meteor.call "Apollos.user.changePassword", oldPassword, newPassword, ->
      Accounts.changePassword oldPassword, newPassword, callback

if Meteor.isServer
  Meteor.methods
    "Apollos.user.changePassword": Apollos.user.changePassword

  # TODO this is not secure
  Apollos.emailTemplates = Accounts.emailTemplates
