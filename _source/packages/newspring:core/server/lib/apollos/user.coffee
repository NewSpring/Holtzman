###

  Apollos.user.getAccountType

  @example indicates if the given email has a local account. If not, indicates
    if the email belongs to an old F1 account?

    Apollos.user.getAccountType([string])

  @param email [String] the email to evaluate

###
Apollos.user.getAccountType = (email) ->

  # this will need to be a different check because non newspring emails can be in ldap
  if email.match /@newspring.cc/
    return Apollos.enums.accountType.ldap

  localAccount = Meteor.users.findOne
    "emails.address": email

  if localAccount
    return Apollos.enums.accountType.apollos

  # f1Account = Apollos.user.login.f1.hasAccount email
  #
  # if f1Account
  #   return Apollos.enums.accountType.f1

  return Apollos.enums.accountType.none

###

  Apollos.user.translate

  @example take data from a service and format it for Apollos

    Apollos.user.translate([obj, platform])

  @param user [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.user.translate = (user, platform) ->

  # Default to Rock
  if not platform
    platform = Rock.name

  # forced uppercase to make case insensitive strings
  switch platform.toUpperCase()
    when Rock.name.toUpperCase()

      # Grab existing user for merging if
      if user
        existingUser = Apollos.users.findOne
          "rock.userLoginId": user.Id
      else
        user = Rock.user()

      existingUser or= {}

      # add rock property
      if not existingUser.rock
        existingUser.rock = {}

      # map properties from Rock to Apollos
      if user.PersonId
        existingUser.rock.personId = Number user.PersonId
      else
        existingUser.rock.personId = null

      existingUser.rock.guid = user.Guid

      if user.Id
        existingUser.rock.userLoginId = Number user.Id
      else
        existingUser.rock.userLoginId = null

      # If we have a vaildated email
      if Apollos.validate.isEmail user.UserName
        existingUser.emails = existingUser.emails or []
        existingUser.emails[0] = existingUser.emails[0] or {}
        existingUser.emails[0].address = user.UserName

      # if the password is a hashed thing
      if Apollos.validate.isBcryptHash user.ApollosHash
        existingUser.services = existingUser.services or {}
        existingUser.services.password = existingUser.services.password or {}
        existingUser.services.password.bcrypt = user.ApollosHash

      return existingUser

###

  Apollos.user.delete

  @example take a user and delete it

    Apollos.user.delete(user, [platform])

  @param user [Object|String|Number] existing document, _id, or rock.userLoginId
  @param platform [String] platform initiating the delete

###
Apollos.user.delete = (user, platform) ->

  if typeof user is "number"
    user = Apollos.users.findOne
      "rock.userLoginId": user

  else if typeof user is "string"
    user = Apollos.users.findOne user

  # Apollos.users.update user, platform
  if platform and platform.toUpperCase() is Rock.name.toUpperCase()
    user.updatedBy = Rock.name
  else
    user.updatedBy = Apollos.name

  # We have to update this first so the collection hooks know what to do
  Apollos.users.update
    _id: user._id
  ,
    $set:
      "updatedBy": user.updatedBy

  debug "Trying to remove user #{user._id} with a platform of #{user.updatedBy}"

  Apollos.users.remove user._id

###

  Apollos.user.update

  @example update a usr in apollos with data from Rock

    Apollos.user.update([obj, platform])

  @param user [Object] existing user from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.user.update = (user, platform) ->

  user = Apollos.user.translate user

  query =
    $or: [
      "rock.userLoginId": user.rock.userLoginId
    ]

  if user.emails and user.emails[0] and user.emails[0].address
    hasEmail = true
    query["$or"].push
      "emails.address": user.emails[0].address

  users = Apollos.users.find(query).fetch()

  if users.length > 1
    ids = []

    users.forEach (usr) ->
      ids.push usr._id

    throw new Meteor.Error "Rock sync issue", "User doc ids #{ids.join ", "}
      need investigated because they seem to be duplicates"

  else if users.length is 0 and hasEmail
    tempPassword = String(Date.now() * Math.random())
    userId = Apollos.user.create(user.emails[0].address, tempPassword)
    usr = Apollos.users.findOne userId

  else
    usr = users[0]

  if platform and platform.toUpperCase() is Rock.name.toUpperCase()
    user.updatedBy = Rock.name
  else
    user.updatedBy = Apollos.name

  # can't upsert with _id present
  delete user._id

  if usr

    Apollos.users.update
      _id: usr._id
    ,
      $set: user

    return usr._id

initializing = true

Apollos.users.find().observe

  added: (doc) ->

    if initializing
      return
    if doc.updatedBy isnt Rock.name and doc.updatedBy
        Rock.user.create doc


  changed: (newDoc, oldDoc) ->

    if newDoc.updatedBy isnt Rock.name
      Rock.user.update newDoc

  removed: (doc) ->

    if doc.updatedBy isnt Rock.name
      Rock.user.delete doc, Rock.name
    return

initializing = false
